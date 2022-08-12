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
exports.registerUser = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const http_status_codes_1 = require("http-status-codes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Gets all users from DB
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find().select("username email");
        res.json(users);
    }
    catch (err) {
        console.log(err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.getAllUsers = getAllUsers;
// Registers a user in the database
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, favPlanet = Math.floor(Math.random() * 9) + 1, // Sets random favPlanet if none were provided
     } = req.body;
    try {
        // Check if user exists
        const userWithUsername = yield User_1.User.findOne({ username: username });
        if (userWithUsername) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                errors: [{ msg: "This username is already taken" }],
            });
            return;
        }
        const userWithEmail = yield User_1.User.findOne({ email: email });
        if (userWithEmail) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                errors: [{ msg: "This email is already taken" }],
            });
            return;
        }
        // If validation succeeds
        const newUser = new User_1.User({
            username: username,
            email: email,
            password: password,
            favPlanet: favPlanet,
        });
        // Encrypt password
        const salt = yield bcryptjs_1.default.genSalt(10);
        newUser.password = yield bcryptjs_1.default.hash(password, salt);
        yield newUser.save();
        // Return jsonwebtoken
        const payload = {
            user: {
                id: newUser.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7 days",
        }, (error, token) => {
            if (error)
                throw error;
            res.json({ token });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
});
exports.registerUser = registerUser;
