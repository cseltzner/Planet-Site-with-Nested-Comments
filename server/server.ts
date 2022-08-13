import express from "express";
import dotEnv from "dotenv";
import { connectDB } from "./config/db";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/PostRoutes";
dotEnv.config();

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
