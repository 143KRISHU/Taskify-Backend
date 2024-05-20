import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv"

dotenv.config({
      path:'.env'
})

const userSchema = new Schema({
      fullname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
      },
      userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // to enhance the searchability
      },
      email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
      },
      address: {
            type: String
      },
      password: {
            type: String,
            required: [true, "Password is required"],
      },

}, { timestamps: true });

//Hooks
userSchema.pre("save", async function (next) {

      //paswword only be encrypt if it is modifies or stores first time

      if (!this.isModified("password")) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next()
})

//Custom Methods
userSchema.methods.isPasswordCorrect = async function (password) {
      return await bcrypt.compare(password, this.password);
}

// Access Token generator
userSchema.methods.generateAccessToken = function () {
      return jwt.sign(
            {
                  _id: this._id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                  expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
      )
}
userSchema.methods.generateRefreshToken = function () {
      return jwt.sign(
            {
                  _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                  expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
      )
}

const User = mongoose.model("User", userSchema);

export default User;