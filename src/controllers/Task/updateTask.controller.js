import asyncHandler from "../../utils/asyncHandler.js"
import apiResponse from "../../utils/apiResponse.js"
import Task from "../../models/task.models.js"
import ApiError from "../../utils/apiError.js"

const updateTask  = asyncHandler(async(req,res)=>{
      const {title,description,id} = req.body
      try {
            const updatedTask = await Task.findByIdAndUpdate(id,{title:title,description:description},{new:true})
            res.status(200).json(
                  new apiResponse(200, { updatedTask }, "Task Updated Successfully")
            )
            
      } catch (error) {
            res.status(500).json(new ApiError(500,`${error.message}`))
      }
})

export default updateTask