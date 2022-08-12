import express from "express";
import dotEnv from "dotenv";
dotEnv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
