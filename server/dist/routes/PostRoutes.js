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
const postController_1 = require("../controllers/postController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// @route GET api/posts/:planet
// @desc Get all posts
// @access Public
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @todo get all posts
}));
// @route POST api/posts/:planetId (eg. Planet 1 = Mercury)
// @desc Create a post
// @access Private
// @body title:String, body:String
router.post("/:planetId", // planetId: Number(1 through 9)
[
    auth_1.authMiddleware,
    (0, express_validator_1.check)("title", "Posts must contain a title").not().isEmpty(),
    (0, express_validator_1.check)("title", "Title must be less than 300 characters").isLength({
        max: 300,
    }),
    (0, express_validator_1.check)("body", "Post body must not be empty").not().isEmpty(),
    (0, express_validator_1.check)("body", "Post body must be less than 5000 characters").isLength({
        max: 5000,
    }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    yield (0, postController_1.createPost)(req, res);
}));
// @route GET api/posts/:planetId (eg. Planet 1 = Mercury)
// @desc Get all posts for a planet
// @access Public
router.get("/:planetId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, postController_1.getAllPosts)(req, res);
}));
// @route PUT api/posts/:postId
// @desc Edit post body
// @access Private
// @body body:String
router.put("/:postId", [
    auth_1.authMiddleware,
    (0, express_validator_1.check)("body", "Post body must not be empty").not().isEmpty(),
    (0, express_validator_1.check)("body", "Post body must be less than 5000 characters").isLength({
        max: 5000,
    }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    yield (0, postController_1.editPost)(req, res);
}));
exports.default = router;
