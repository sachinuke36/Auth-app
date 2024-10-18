import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:false, select:false},
    googleId:{type: String},
    githubId:{type:String},
    image:{ type:String}
},{timestamps:true});


export const User = mongoose.models?.User || mongoose.model("User",userSchema);