import  ApiError  from '../utils/apiError.js';
import  asyncHandler  from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const verifyUser = asyncHandler(async (req, res, next) => {
      try {
            console.log(req.cookies)
            const token = req.cookies?.accessToken ||
                  req.header("Authorizarion")?.replace("Bearer ", "");
            console.log(token)
            if (!token) {
                  res
                        .status(401)
                        .json(new ApiError(401, "User not Login"));
                  return
            }

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

            if (!user) {
                  res
                        .status(401)
                        .json(new ApiError(401, "Invalid Access Token"));
                  return
            }

            req.user = user;
            next()
      } catch (error) {
            console.log(error)
            res
                  .status(401)
                  .json(new ApiError(401,  "Invalid Access kindly login Agian"));
            return
      }
})

export default verifyUser