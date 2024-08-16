const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  hashedPassword: String,
  isAdmin: Boolean,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
