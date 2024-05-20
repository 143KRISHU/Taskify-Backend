import asyncHandler from "../../utils/asyncHandler.js"
import apiResponse from "../../utils/apiResponse.js"
import Board from "../../models/board.model.js"
import Task from "../../models/task.models.js"
import ApiError from "../../utils/apiError.js"

const deleteBoard = asyncHandler(async(req,res)=>{
      try {
            const {board} = req.body
            const checkUserBoard= await Board.find({admin:req.user._id})
            if(!checkUserBoard){
                  res.status(401).json(new ApiError(401,`You are Not Authorised`))
            }
            const deletedBoard = await Board.findByIdAndDelete(board._id)
            if(deletedBoard){
                  const allTaskOFBoard = await Task.find({board:board._id})
                  for(let i=0;i<allTaskOFBoard.length;i++){
                        let taskDel = await Task.findByIdAndDelete(allTaskOFBoard[i]._id)
                        if(taskDel){ console.log('i : ', taskDel)}
                  }
            }
            res.status(200).json(
                  new apiResponse(200, {}, ` Deleted Successfully`)
            )
      } catch (error) {
            res.status(500).json(new ApiError(500,`${error.message}`))
      }
})

export default deleteBoard