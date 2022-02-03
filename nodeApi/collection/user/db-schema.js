const mongoose = require('mongoose');
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    
  },
  { timestamps: true }
);

// userSchema.pre("save",async function(next){
//   const passwordHash = await bcrypt.hash(password,10);
//   console.log(`the password is ${this.password}`);
//    next();
// });

module.exports = mongoose.model("userData", userSchema);
