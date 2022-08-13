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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userController_1.getAllUsers)(req, res);
}));
// @route   POST api/users
// @desc    Register User
// @access  Public
// @body    username:String , email:String , password:String, favPlanet:Number? (from 1 to 9)
router.post("/", [
    (0, express_validator_1.check)("username", "Username must be at least 2 characters long").isLength({
        min: 2,
    }),
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // If validation error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }
    // If validation succeeds
    yield (0, userController_1.registerUser)(req, res);
}));
exports.default = router;
