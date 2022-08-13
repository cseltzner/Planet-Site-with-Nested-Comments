"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.getAuthenticatedUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getAuthenticatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userId) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield User_1.User.findById(userId).select("-password");
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
});
exports.getAuthenticatedUser = getAuthenticatedUser;
// Authenticate a user and send back a toeken
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    // Check if either username or email were sent
    if (!username && !email) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: "Please include an email or a username" });
    }
    // Check if password was sent
    if (!password) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: "Please include a password" });
    }
    // If validation succeeds
    let user;
    // Get user by email
    if (email) {
        user = yield User_1.User.findOne({ email: email });
    }
    // Get user by username if none are found by email
    if (!user) {
        user = yield User_1.User.findOne({ username: username });
    }
    // If no user from email or username, credentials are invalid
    if (!user) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: [{ msg: "Invalid credentials" }] });
    }
    // Compare passwords
    const passwordsMatch = yield bcryptjs_1.default.compare(password, user.password.toString());
    // If password is incorrect
    if (!passwordsMatch) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: [{ msg: "Invalid credentials" }] });
    }
    // If all credentials valid, return jwt
    const payload = {
        user: {
            id: user.id,
        },
    };
    jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7 days",
    }, (err, token) => {
        if (err)
            throw err;
        res.json({ token });
    });
    try {
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
});
exports.authenticateUser = authenticateUser;
