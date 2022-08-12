import express from "express";
import dotEnv from "dotenv";
import { connectDB } from "./config/db";
import userRouter from "./routes/userRoutes";
dotEnv.config();

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
