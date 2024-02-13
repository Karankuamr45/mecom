import mongoose from 'mongoose';

const connectDb = async(DATABASE_URL)=>{
    try {
        const DATABASE_NAME = {
            dbName : "mecom"
        }
      await  mongoose.connect(DATABASE_URL,DATABASE_NAME);
      console.log("Database connected successfully of mecom")
    } catch (error) {
        console.log(error.message)
    }
}


export default connectDb;