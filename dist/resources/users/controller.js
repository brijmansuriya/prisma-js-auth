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
exports.createUser = exports.getAllUsers = void 0;
const authGenerator_1 = require("../../utils/authGenerator");
// I'm importing from service my patched version of prisma model
const service_1 = __importDefault(require("./service"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield service_1.default.findMany();
    res.json({ data: allUsers });
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    // This is my modified create version, with the password hashing!
    const savedUser = yield service_1.default.createWithHash(newUser);
    const token = authGenerator_1.createToken({
        id: savedUser.id,
        username: savedUser.username,
    });
    // This creates a cookie that can't be accessed by Javascript in the Frontend
    // httpOnly: true
    res.cookie("token", token, { httpOnly: true });
    res.json({ data: { username: savedUser.username } });
});
exports.createUser = createUser;
