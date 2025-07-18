import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import { PORT, mongodb } from "./config.mjs";
import router from "./src/routes/route.mjs";

const app= express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use(express.json());
app.use(multer().any());

mongoose.connect(mongodb)
.then(()=>console.log("database connected successfully"))
.catch((err)=>console.log(err));

app.use('/', router);
app.listen(PORT, ()=>{
    console.log(`Server started at port : ${PORT}`);
})