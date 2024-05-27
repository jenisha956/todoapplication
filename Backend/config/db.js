import mongoose from "mongoose";


const connectDb= async() =>{
  const conn = await mongoose.connect("mongodb+srv://rjenisha17:59YVV0uutdUJ4ONa@cluster0.9fzjdev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

console.log(`MongoDB connected: ${conn.connection.host} `);


};
export default connectDb;

