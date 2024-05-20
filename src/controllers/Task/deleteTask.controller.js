import asyncHandler from "../../utils/asyncHandler.js"
import apiResponse from "../../utils/apiResponse.js"
import Board from "../../models/board.model.js"
import Task from "../../models/task.models.js"
import ApiError from "../../utils/apiError.js"

const deleteTask = asyncHandler(async(req,res)=>{
      const {task} = req.body
      try {
            await Task.findByIdAndDelete(task._id)
            res.status(200).json(
                  new apiResponse(200, {}, `${task.title} Deleted Successfully !!`)
            )
            
      } catch (error) {
            res.status(500).json(new ApiError(500,`${error.message}`))
      }
})
export default deleteTask 