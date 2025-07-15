import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    // DB setup here
},{timestamps:true});

export default mongoose.model("users", userSchema);