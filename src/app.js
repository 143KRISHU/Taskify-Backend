import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
      origin:process.env.CORS_ORIGIN,
      credentials:true
}));

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

// User Router Import
import userRouter from "./routes/user.route.js";
// routes declaration
app.use("/api/v1/user",userRouter);

//Board Router Import 
import boardRouter from "./routes/board.route.js";
// Routes declaration
app.use('/api/v1/board',boardRouter)

//Task Router Import
import taskRouter from "./routes/task.routes.js";
// Routes declartion
app.use('/api/v1/task',taskRouter)
export default app;