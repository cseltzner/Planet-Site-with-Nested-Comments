"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_status_codes_1 = require("http-status-codes");
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({
            msg: "Token must be sent in the Authorization header with Bearer",
        });
    }
    // Verify token
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.user;
        next();
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ msg: "Authorization token not valid" });
    }
};
exports.authMiddleware = authMiddleware;
