const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  isRestaurant: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
