import express from "express";
import dotenv from "dotenv";
dotenv.config({path:'../../packages/db/.env'});
import prismaClient from "@repo/db/client";


const app=express();
app.use(express.json());

app.post("/create",async (req,res)=>{
    console.log(process.env["DATABASE_URL"]);
    const {username,password}=req.body;
    const user=await prismaClient.user.create({
        data:{
            username:username,
            password:password
        }
    });
    if(user){
        res.send(user.data);
        console.log(user);
    }else{
        res.send("not created");
    }
});

app.listen(3001,()=>{console.log("listening on port 3001")});