"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPopulate = void 0;
exports.postPopulate = {
    path: "comments",
    model: "comment",
    populate: {
        path: "childComments",
        model: "childcomment",
    },
};
