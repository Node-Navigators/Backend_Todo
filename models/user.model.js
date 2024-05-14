import jwt from 'jsonwebtoken';
import mongoose, { Schema } from "mongoose";
const secretKey = process.env.Secret_Key;


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email : {
        type : String, 
        required : true 
    },
    password : {
        type : String , 
        required : true 
    }
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  //Token is generated using data in payload +secretkey
  const token = jwt.sign({ _id: this._id}, secretKey);
  return token;
} 

export const User = mongoose.model("User", userSchema);
