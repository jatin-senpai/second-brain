"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Content = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.connect("mongodb+srv://Shake:KOnp1ooKOT70MZYO@cluster0.b2igc.mongodb.net/Brainly");
const Usermodel = new mongoose_2.Schema({
    username: { type: String, unique: true },
    password: { type: String }
});
exports.User = mongoose_1.default.model("user", Usermodel);
const Contentmodel = new mongoose_2.Schema({
    title: String,
    tpye: String,
    link: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "tags" }],
    UserId: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "user",
            required: true
        }]
});
exports.Content = mongoose_1.default.model("content", Contentmodel);
const Linkmodel = new mongoose_2.Schema({
    hash: String,
    UserId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    }
});
exports.Link = mongoose_1.default.model("link", Linkmodel);
