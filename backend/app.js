import express from 'express';
import router from './router/web.js';
import connectDb from './db/connectDb.js';
import authRoutes from './router/authRoutes.js';
import cors from 'cors';
import productRoutes from './router/productRoutes.js';
import categoryRoutes from './router/categoryRoutes.js';
const app = express();
const port = process.env.PORT || 4500;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://karan:karan12712@cluster0.z9qdea3.mongodb.net/";

connectDb(DATABASE_URL);

app.use(express.json());
app.use(cors());

app.use('/',router);
app.use('/auth',authRoutes);
app.use('/product',productRoutes);
app.use('/category',categoryRoutes);



app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})