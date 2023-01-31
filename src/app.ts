import express from "express";
import usersRouter from "./resources/users/router";
import authRouter from "./resources/auth/router";
import postsRouter from "./resources/posts/router";
import { JwtPayload } from "jsonwebtoken";
import loginAuth from "./middlewares/loginAuth";

declare global {
  namespace Express {
    interface Request {
      currentUser: string | JwtPayload;
    }
  }
}

const cors = require("cors");

const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3001", credentials: true })); // Enables the OPTIONS request check in our API

// App routes

/* 
  REMINDER

  Routes and middlewares run from top to bottom in the order you call them here

*/

// This is NOT under login protection
app.use(authRouter);

// This is your gate keeper to make sure the user is logged in!
// Any route after this one will be protected by login!
app.use(loginAuth);

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.all("*", (req, res) => {
  res.status(404).json("No route match");
});

module.exports = app;
