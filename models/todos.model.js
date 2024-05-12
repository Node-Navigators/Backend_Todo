import mongoose , {Schema} from "mongoose";

const todoSchema = new Schema ({
    title : {
        type : String , 
        
    },
    desciption : {
        type : String,
    },
    completed : {
        type : Boolean , 
    },
    date : {
        type : Date ,
    },
    user : {
        type : Schema.Types.ObjectId ,
    }
} , {})