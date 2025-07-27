import mongoose from "mongoose";

const dbconnect= async()=>{
  try{
      await mongoose.connect(process.env.MONGO_URL!)
      console.log('CONNECTED TO MONGODB SUCSESS')
  } catch(error) {
      console.log('CONNECTED TO MONGODB FAILED')
      process.exit(1);
  }
};

export default dbconnect;
