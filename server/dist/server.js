"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const childCommentRoutes_1 = __importDefault(require("./routes/childCommentRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.connectDB)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/posts", postRoutes_1.default);
app.use("/api/posts/comments", commentRoutes_1.default, childCommentRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Hello from the server");
});
app.listen(process.env.PORT || 3001, () => {
    console.log("Server started");
});
