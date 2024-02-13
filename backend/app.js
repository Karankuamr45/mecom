import express from 'express';
import router from './router/web.js';
import connectDb from './db/connectDb.js';
const app = express();
const port = process.env.PORT || 9090;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

connectDb(DATABASE_URL)

app.use('/',router)



app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})