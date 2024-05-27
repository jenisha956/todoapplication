import express from "express";
import connectDb from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js"
import cors from'cors'


connectDb();

const app=express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
res.json("api is running")
});

app.use("/api/todo",todoRoutes)

// app.get("/api/todo",)
app.listen(5000,()=>{
  console.log("server runing on port 5000")
})