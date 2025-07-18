import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./src/utils/db.mjs";
import userRoute from "./src/routes/userRoute.mjs";
import postRoute from "./src/routes/postRoute.mjs";
import messageRoute from "./src/routes/messageRoute.mjs";
import { app, server } from "./src/socket/socket.mjs";
import path from "path";
 
dotenv.config();


const PORT = process.env.PORT || 3000;



//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.URL,
    credentials: true
}
app.use(cors(corsOptions));

// yha pr apni api ayengi
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);



server.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});