const mongoose = require('mongoose'); // include monogoose


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username must be provided"],
      unique: true
    },

    email: {
      type: String,
      required: [true, "email must be provided"], // making email required
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"] // regex to validate email format(also check if it is valid)
    },

    password: {
      type: String,
      required: [true, "password must be provided"],
      minlength: [8, "password must be at least 8 characters long"], // ensure the length of password 
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user'
    }
  },
  {
    timestamps: true // this will automatically add createdAt and updatedAt
  }
);

const user = mongoose.model("user", userSchema) // create a model nmaed user using the schema

module.exports = user // export the model so it can be used in other files
     