import {Router} from "express"
import createNewTask from "../controllers/Task/createNewTask.controller.js"
import deleteTask from "../controllers/Task/deleteTask.controller.js"
import getAllTaskOfCurrentBoard from "../controllers/Task/getAllTaskOfCurrentBoard.controller.js"
import taskSatausChange from "../controllers/Task/taskStatusChange.controller.js"
import updateTask from "../controllers/Task/updateTask.controller.js"

const taskRouter = Router()

taskRouter.route('/addTask').post(createNewTask)
taskRouter.route('/getAllTask').post(getAllTaskOfCurrentBoard)
taskRouter.route('/taskStatusChnage').post(taskSatausChange)
taskRouter.route('/updateTask').post(updateTask)
taskRouter.route('/deleteTask').post(deleteTask)

export default taskRouter