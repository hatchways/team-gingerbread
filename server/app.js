/* eslint-disable no-console */
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { join } = require("path");
const connectDB = require("./db");
const { notFound, errorHandler } = require("./middleware/error");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const imageRouter = require("./routes/image");
const notificationsRouter = require("./routes/notifications");
const bookingRequestRouter = require("./routes/bookingRequest");
const conversationsRouter = require("./routes/conversations");
const messagesRouter = require("./routes/messages");
const stripeRouter = require("./routes/stripe");
const reviewRouter = require("./routes/review");

const { json, urlencoded } = express;

connectDB();
const app = express();

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected");
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/image", imageRouter);
app.use("/notifications", notificationsRouter);
app.use("/booking-requests", bookingRequestRouter);
app.use("/conversations", conversationsRouter);
app.use("/messages", messagesRouter);
app.use("/profile", profileRouter);
app.use("/stripe", stripeRouter);
app.use("/reviews", reviewRouter);

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
