import asyncHandler from "../../utils/asyncHandler.js"
import apiResponse from "../../utils/apiResponse.js"
import Board from "../../models/board.model.js"
import ApiError from "../../utils/apiError.js"

const getAllBoardOfCurrentUser = asyncHandler(async (req, res, next) => {
      try {
            const allBoards = await Board.find({ admin: req.user._id }).sort({ createdAt: -1 })
            res.status(200).json(
                  new apiResponse(200, { allBoards }, "Success")
            )
      } catch (error) {
                  res.status(500).json(new ApiError(500,`${error.message}`))
      }
})

export default getAllBoardOfCurrentUser