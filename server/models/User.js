const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const conversationsArrayBound = (val) => val.length <= 100;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  conversations: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
    validate: [conversationsArrayBound, "Exceeded number of conversations limit."],
    required: false,
    default: [],
  },
});

userSchema.methods.matchPassword = async (enteredPassword) => {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (e) {
    return e;
  }
};

userSchema.pre("save", async (next) => {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = User = mongoose.model("User", userSchema);
