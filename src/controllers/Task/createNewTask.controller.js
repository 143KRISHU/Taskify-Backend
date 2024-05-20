import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js"
import apiResponse from "../../utils/apiResponse.js"
import Board from "../../models/board.model.js"
import Task from "../../models/task.models.js";
const createNewTask = asyncHandler(async(req,res)=>{
      const {title,description,dueDate,boardID}= req.body
      const dueDateInISO = new Date(req.body?.dueDate).toISOString()
      try {
            if(!boardID){
                  res.status(400).json(
                        new apiError(400,`Board is required in order To Add task`)
                  )
            }

            const board = await Board.find({_id:boardID})
            
            
            const newTask = await Task.create({
                  title : title,
                  description : description,
                  dueDate:dueDateInISO,
                  board:boardID
            })

            if(!newTask){
                  res.status(500).json(
                        new apiError(500,`Something Went Wrong Plaese Try Again Later`)
                  )
            }

            res.status(200).json(new apiResponse(200,newTask,'Task Added Successfully'))

      } catch (error) {
            res.status(500).json(
                  new apiError(500,`${error.message}`)
            )
      }
})

export default createNewTask