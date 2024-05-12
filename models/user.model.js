import express from "express";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email : {
        type : email, 
        required : true 
    },
    password : {
        type : String , 
        required : true 
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
