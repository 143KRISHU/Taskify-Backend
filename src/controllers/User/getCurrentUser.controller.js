import ApiResponse from "../../utils/apiResponse.js"

function getCurrentUser(req, res, next) {
      res.status(200).json(
            new ApiResponse
                  (200, req.user,`Welcome ${req.user.fullname} !!`)
      )
}

export default getCurrentUser
