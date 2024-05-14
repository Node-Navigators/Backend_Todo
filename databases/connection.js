import mongoose from "mongoose";


export function connectToMongo() {
    mongoose.connect('mongodb://0.0.0.0:27017/todo')
        .then(() => console.log('Connected...'))
        .catch(error => console.error('Could not connect to MongoDB...', error));
}