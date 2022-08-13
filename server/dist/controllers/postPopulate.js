"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPopulate = void 0;
/**
 * Used in mongoose populate function to populate a post with comments and child comments.
 * Eg. Post.find().populate(postPopulate)
 */
exports.postPopulate = {
    path: "comments",
    model: "comment",
    populate: {
        path: "childComments",
        model: "childcomment",
    },
};
