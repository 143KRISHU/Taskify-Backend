import mongoose ,{Schema} from "mongoose"

const BoardSchema = new Schema({
      boardName :{
            type:String,
            required:true,
            index:true,
      },
      admin:{
            type:Schema.Types.ObjectId,
            ref:'User'
      }
},{timestamps:true})

const Board = mongoose.model('Board',BoardSchema)
export default Board