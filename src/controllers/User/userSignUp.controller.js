import asyncHandler from "../../utils/asyncHandler.js"
import ApiError from "../../utils/apiError.js"
import ApiResponse from "../../utils/apiResponse.js"
import User from "../../models/user.model.js"


const signUpUser = asyncHandler(async function (req, res, next) {

      const { username, fullname, email, password, confirmPassword } = req.body

      const validUsername = /^[0-9A-Za-z]{6,16}$/;
      const isStrongPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/

      // Validation if req come from other Source
      if (!fullname) {
            res.status(400).json(
                  new ApiError(400, "Full name is required")
            )
            return
      }

      if (!email) {
            res.status(400).json(new ApiError(400, "eamil is required"))
            return
      }

      if (!username) {
            res.status(400).json(new ApiError(400, "username is required"))
            return
      }
      else if (!validUsername.test(username)) {
            res.status(400).json(new ApiError(400, "Inavlid Username - username can't have special character and should be alphanumeric "))
            return
      }
      else if (username.length > 16) {
            res.status(400).json(new ApiError(400, "Username can not exceeds 10 character"))
            return
      }
      else if (username.length < 8) {
            res.status(400).json(new ApiError(400, "UserName must have atleast 8 character"))
            return
      }



      if (!password) {
            res.status(400).json(new ApiError(400, "password is required"))
            return
      }
      else if (!isStrongPassword.test(password)) {
            res.status(400).json(
                  new ApiError(400, 'Password must contain at least one each of a number, uppercase letter, lowercase letter, and non-alphanumeric and length of password should be of 8 character'))
            return
      }
      else if (password.length < 4) {
            res.status(400).json(new ApiError(400, "Password should be atleast of 4 character"))
            return
      }
      else if (password.length > 10) {
            res.status(400).json(new ApiError(400, "Password should not exceeds 10 character"))
            return
      }

      if (!confirmPassword) {
            res.status(400).json(new ApiError(400, "Confirm Password is required"))
            return
      }

      if (!(confirmPassword === password)) {
            res.status(400).json(new ApiError(400, "Confirm Password and Password should be same is required"))
            return
      }


      const userData = await User.findOne({ $or: [{ email: email }, { userName: username }] })
      if (userData) {
            res.status(409).json(
                  new ApiError(409, "Customer is already exist with the same email or username"))
            return
      }

      const newUser = await User.create({
            userName: username.toLowerCase(),
            email: email.toLowerCase(),
            fullname: fullname.toLowerCase(),
            address: "",
            password: password
      });

      if (!newUser) {
            res.status(500).json(new ApiError(500, "Something went wrong while registering the user pleaase refresh the page and try again"))
            return
      }
      const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

      return res.status(200).json(
            new ApiResponse(200, createdUser, "An Email Sent to Your Email Account please verify before login")
      )
})

export default signUpUser;
