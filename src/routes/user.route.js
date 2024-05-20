import {Router} from "express"
import signUpUser from "../controllers/User/userSignUp.controller.js";
import logInUser from "../controllers/User/userlogIn.controller.js";
import logOutUser from "../controllers/User/userlogout.controller.js"
import verifyUser from "../middlewares/userAuth.middleware.js"
import getCurrentUser from "../controllers/User/getCurrentUser.controller.js";

const userRouter = Router()

userRouter.route("/signup").post(signUpUser);
userRouter.route("/login").post(logInUser);
userRouter.route("/logout").post(verifyUser,logOutUser);
userRouter.route("/current-user").post(verifyUser,getCurrentUser)

export default userRouter;