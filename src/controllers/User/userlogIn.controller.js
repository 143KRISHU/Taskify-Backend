import asyncHandler from "../../utils/asyncHandler.js"
import ApiError from "../../utils/apiError.js"
import ApiResponse from "../../utils/apiResponse.js"
import User from "../../models/user.model.js"

const generateAccessTokens = async (custId) => {
      try {
            const user = await User.findById(custId);
            const accessToken = user.generateAccessToken();
            await user.save({ validateBeforeSave: false });

            return { accessToken};
      } catch (error) {
            throw new ApiError(500, `Token generation error : ${error}`);
      }
}

const logInUser = asyncHandler(async function (req, res, next) {
      const { email, password } = req.body;

      if (!email) {
            res.status(400).json(
                  new ApiError(400, "Registered Email is Required??")
            )
            return
      }

      if (!password) {
            res.status(400).json(
                  new ApiError(400, "Password is Required??")
            )
            return
      }

      // getting User from the DataBase
      const getUser = await User.findOne({ email: email });


      if (!getUser) {
            res.status(400).json(
                  new ApiError(400, "You are Not Registered")
            )
            return
      }


      // Checking Password from the pre built function in the user model

      const isPasswordValid = await getUser.isPasswordCorrect(password);

      if (!isPasswordValid) {
            res.status(400).json(
                  new ApiError(400, "Inavlid Customer Credential")
            )
            return
      }

      //generate AccessToken 

      const { accessToken } = await generateAccessTokens(getUser._id);

      const UserLoggedIn = await User.findOne({ email: email },{password:0,refreshToken:0,address:0});

      // Setting up the cookie

      const options = {
            httpOnly: true,
            secure: true
      }

      return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json(
                  new ApiResponse(
                        200,
                        {
                              data: UserLoggedIn,
                              accessToken:accessToken
                        },
                        "You are SuccessFully LoggedIn"
                  )
            )
})

export default logInUser;