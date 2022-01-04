/* eslint-disable no-console */
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { join } = require("path");
const jwt = require("jsonwebtoken");
const connectDB = require("./db");
const { notFound, errorHandler } = require("./middleware/error");

const User = require("./models/User");
const Notification = require("./models/Notifications");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const imageRouter = require("./routes/image");
const notificationsRouter = require("./routes/notifications");
const bookingRequestRouter = require("./routes/bookingRequest");
const stripeRouter = require("./routes/stripe");

const { json, urlencoded } = express;

connectDB();
const app = express();

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

const loggedInUsers = new Map();

io.use((socket, next) => {
  if (socket.handshake.headers.cookie) {
    const token = socket.handshake.headers.cookie.replace("token=", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        socket.disconnect();
        next();
      }

      const userExists = User.exists({ _id: decoded.id });
      if (userExists) {
        loggedInUsers.set(socket, decoded.id);
        next();
      } else {
        socket.disconnect();
        next();
      }
    });
  } else {
    socket.disconnect();
    next();
  }
}).on("connection", (socket) => {
  console.log(Array.from(loggedInUsers.values()));
  socket.on("get unread notifications", (id) => {
    const notifications = await Notification.find({ recipient: id, read: false });
    io.emit("new unread notifications", notifications);
  });
  socket.on("disconnect", () => {
    loggedInUsers.delete(socket);
    console.log(Array.from(loggedInUsers.values()));
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/image", imageRouter);
app.use("/profile", profileRouter);
app.use("/notifications", notificationsRouter);
app.use("/booking-requests", bookingRequestRouter);
app.use("/profile", profileRouter);
app.use("/stripe", stripeRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname), "client", "build", "index.html"));
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
