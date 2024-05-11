import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session"
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({
    limit: "100kb",
    extended: true
}
));
 app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
app.use(express.static("public"));
app.use(cookieParser());

app.use(session({
    secret:process.env.secret
}))
// routes

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
export default app;

//exporting app