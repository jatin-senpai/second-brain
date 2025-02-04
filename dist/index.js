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
const express_1 = __importDefault(require("express"));
const util_1 = require("./util");
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.User.create({
            username: username,
            password: password
        });
        res.json({
            message: "You have signed up"
        });
    }
    catch (e) {
        res.status(403).json({
            message: "User already exists"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.jwtkey);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
}));
app.post("/api/v1/content", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    yield db_1.Content.create({
        link,
        type,
        title,
        //@ts-ignore
        UserId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get("/api/v1/content", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const us = req.userId;
    const mat = yield db_1.Content.find({ UserId: us }).populate("UserId", "username");
    res.status(200).json(mat);
}));
app.delete("/api/v1/content", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const delete_id = req.userId;
    const del = yield db_1.Content.deleteMany({ Content: db_1.Content, UserId: delete_id });
    res.status(200).json({
        message: "Deleted"
    });
}));
app.post("/api/v1/brain/share", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let has = (0, util_1.random)(10);
    const share = req.body.share;
    if (share) {
        try {
            yield db_1.Link.create({
                hash: has,
                //@ts-ignore
                UserId: req.userId
            });
            res.status(200).json({
                link: has
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        yield db_1.Link.deleteOne({
            //@ts-ignore
            UserId: req.userId
        });
    }
}));
app.get("/api/v1/brain/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shared = req.params.sharelink;
    const found = yield db_1.Link.findOne({
        hash: shared
    });
    if (!found) {
        res.status(404).json({
            message: "Invalid link"
        });
        return;
    }
    const fu = yield db_1.Content.find({
        UserId: found.UserId
    });
    res.json({
        fu
    });
}));
//@ts-ignore
console.log("Registered routes:", app._router.stack.map(layer => { var _a; return (_a = layer.route) === null || _a === void 0 ? void 0 : _a.path; }).filter(Boolean));
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
