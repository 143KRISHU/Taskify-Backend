import asyncHandler from "../../utils/asyncHandler.js"
import apiResponse from "../../utils/apiResponse.js"
import Board from "../../models/board.model.js"
import ApiError from "../../utils/apiError.js"

const updateBoard = asyncHandler(async(req,res)=>{
            const {boardName,_id} = req.body
            const checkUserBoard = await Board.find({admin:req.user._id})
            if(!checkUserBoard){
                  res.status(401).json(new ApiError(401,`You are Not Authorised`))
            }
            const updateBoard = await Board.findByIdAndUpdate(_id,{boardName:boardName})
            if(!updateBoard){
                  res.status(500).json(new ApiError(500,`Internal Server Error`))
            }
            res.status(200).json(
                  new apiResponse(200,{},'Board Name Updated Successfully')
            )
})

export default updateBoard