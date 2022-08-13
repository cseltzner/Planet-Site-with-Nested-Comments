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
const commentController_1 = require("../controllers/commentController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// @route POST api/posts/comments/:postId
// @desc Create a comment and return the post
// @access Private
// @body body:String
router.post("/:postId", [
    auth_1.authMiddleware,
    (0, express_validator_1.check)("body", "Comment body must not be empty").not().isEmpty(),
    (0, express_validator_1.check)("body", "Comments must be less than 3000 characters long").isLength({
        max: 3000,
    }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    yield (0, commentController_1.addComment)(req, res);
}));
// @route PUT api/posts/comments/:postId/:commentId
// @desc Edit a comment
// @access Private
// @body body:String
router.put("/:postId/:commentId", [
    auth_1.authMiddleware,
    (0, express_validator_1.check)("body", "Comment body must not be empty").not().isEmpty(),
    (0, express_validator_1.check)("body", "Comments must be less than 3000 characters long").isLength({
        max: 3000,
    }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    yield (0, commentController_1.editComment)(req, res);
}));
exports.default = router;
