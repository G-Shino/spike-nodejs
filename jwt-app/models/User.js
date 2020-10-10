const mangoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mangoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6 characters"]
  }
});

// fire a fucntion before doc saved to db
// インスタンスをthisとするためアロー関数だとダメ
userSchema.pre("save", async function (next) {
  console.log("user about to be created & saved", this);
  const salt = await bcrypt.genSalt();
  console.log(salt);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

// collectionに一致 usersに繋がる
const User = mangoose.model("user", userSchema);

module.exports = User;
