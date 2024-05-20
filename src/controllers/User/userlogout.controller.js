import asyncHandler from "../../utils/asyncHandler.js"
import ApiResponse from "../../utils/apiResponse.js"

const logOutUser = asyncHandler(async function (req, res, next) {

      const options = {
            httpOnly: true,
            secure: true
      }

      return res
            .status(200)
            .clearCookie("accessToken", options)
            .json(new ApiResponse(
                  200,
                  null,
                  "User Logged Out SuccessFully")
            )

})

export default logOutUser