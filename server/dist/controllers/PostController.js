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
exports.createPost = void 0;
const http_status_codes_1 = require("http-status-codes");
const Post_1 = require("../models/Post");
// Create a post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, body } = req.body;
    const userId = (_a = req.userId) === null || _a === void 0 ? void 0 : _a.id;
    let planetId;
    // Check if planetId is a number
    try {
        planetId = Number(req.params.planetId);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send("planetId must be a number");
        return;
    }
    try {
        const newPost = new Post_1.Post({
            user: userId,
            title: title,
            body: body,
            planet: planetId,
        });
        const post = yield newPost.save();
        return res.json(post);
    }
    catch (err) {
        console.log(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        return;
    }
    res.send("post 'created'");
});
exports.createPost = createPost;
