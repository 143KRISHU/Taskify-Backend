import {Router} from "express"
import createBoard from "../controllers/Board/createBoard.controller.js"
import deleteBoard from "../controllers/Board/deleteBoard.controller.js"
import getAllBoardOfCurrentUser from "../controllers/Board/getBoardList.controller.js"
import updateBoard from "../controllers/Board/updateBoard.controller.js"
import verifyUser from "../middlewares/userAuth.middleware.js"

const boardRouter = Router()

boardRouter.route('/create-board').post(verifyUser,createBoard)
boardRouter.route('/accessAllBoard').get(verifyUser,getAllBoardOfCurrentUser)
boardRouter.route('/deleteBoard').post(verifyUser,deleteBoard)
boardRouter.route('/updateBoard').post(verifyUser,updateBoard)

export default boardRouter