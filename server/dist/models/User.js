"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S\S+$/],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    favPlanet: {
        type: Number,
        required: true,
        min: 1,
        max: 9,
    },
}, {
    timestamps: true,
});
exports.User = mongoose_1.default.model("user", UserSchema);
