import asyncHandler from "../../utils/asyncHandler.js"
import apiResponse from "../../utils/apiResponse.js"
import Board from "../../models/board.model.js"
import ApiError from "../../utils/apiError.js"

const createBoard = asyncHandler(async(req,res,next)=>{
      const boardName = req.body.boardName

      try {
            if(!boardName){
                  res.status(400).json(
                        new ApiError(400,"BoardName is required")
                  )
                  return
            }

            const boardExist  = await Board.findOne({boardName : boardName})
            if(boardExist){
                  res.status(400).json(
                        new ApiError(400,"BoardName is already exist choose another one")
                  )
                  return
            }
      
            const newBoard = await Board.create({
                  boardName:boardName,
                  admin:req.user._id
            })
      
            if(!newBoard){
                  res.status(500).json(
                        new ApiError(500,"internal Server Error")
                  )
                  return
            }

            const cretedBoard = await Board.find({_id:newBoard._id})

            if(cretedBoard){
                  res.status(200).json(
                        new apiResponse(200,{newBoard},"Board Craeted Successfully")
                  )
                  return
            }

            
      } catch (error) {
            console.log(error)
            res.status(500).json(
                  new ApiError(500,"from catch block internal Server Error")
            )
      }
}) 

export default createBoard