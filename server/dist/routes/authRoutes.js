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
const http_status_codes_1 = require("http-status-codes");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// @route   GET api/auth
// @desc    Get authenticated user
// @access  Private
router.get("/", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, authController_1.getAuthenticatedUser)(req, res);
}));
// @route   POST api/auth
// @desc    Authenticate user and send back token
// @access  Public
// @body    (email:String OR username:String), password:String
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, authController_1.authenticateUser)(req, res);
}));
// @route   DELETE api/auth/enticate
// @desc    Does nothing useful
// @access  Public, a route for the whole world to see and access
router.delete("/enticate", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.IM_A_TEAPOT).send("Hello there");
});
exports.default = router;
