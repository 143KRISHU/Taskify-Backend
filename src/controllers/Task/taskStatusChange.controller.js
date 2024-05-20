import asyncHandler from "../../utils/asyncHandler.js"
import apiResponse from "../../utils/apiResponse.js"
import Task from "../../models/task.models.js"
import ApiError from "../../utils/apiError.js"

const taskSatausChange  = asyncHandler(async(req,res)=>{
      console.log(req.body)
      const {status,_id}=req.body
      try {
            const updatedTask = await Task.findByIdAndUpdate(_id,{status:status},{new:true})
            res.status(200).json(
                  new apiResponse(200, { updatedTask }, "Task Status Upadted")
            )
            
      } catch (error) {
            res.status(500).json(new ApiError(500,`${error.message}`))
      }
})

export default taskSatausChange