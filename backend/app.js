import express from 'express';
import router from './router/web.js';
import connectDb from './db/connectDb.js';
import authRoutes from './router/authRoutes.js';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 4500;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

connectDb(DATABASE_URL);

app.use(express.json());
app.use(cors());

app.use('/',router);
app.use('/auth',authRoutes);



app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})