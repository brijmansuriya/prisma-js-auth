"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./resources/users/router"));
const router_2 = __importDefault(require("./resources/auth/router"));
const router_3 = __importDefault(require("./resources/posts/router"));
const loginAuth_1 = __importDefault(require("./middlewares/loginAuth"));
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express_1.default();
// Middlewares
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3001", credentials: true })); // Enables the OPTIONS request check in our API
// App routes
/*
  REMINDER

  Routes and middlewares run from top to bottom in the order you call them here

*/
// This is NOT under login protection
app.use(router_2.default);
// This is your gate keeper to make sure the user is logged in!
// Any route after this one will be protected by login!
app.use(loginAuth_1.default);
app.use("/users", router_1.default);
app.use("/posts", router_3.default);
app.all("*", (req, res) => {
    res.status(404).json("No route match");
});
module.exports = app;
