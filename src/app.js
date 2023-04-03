import express from "express";
import dbConnect from "./database/db";
import userRouter from "./routes/userRoute"
const app = express();
dbConnect()

app.use(express.json());
app.use('/villageAPI/users', userRouter)

export default app;