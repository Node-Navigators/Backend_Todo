import express from "express";
const app = express();
app.use(express.json());
import { connectToMongo } from './databases/connection.js'; 
connectToMongo();
// const db = require('./databases/connection')();

import user from './routes/user.js';

app.use('/api/user',user);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

