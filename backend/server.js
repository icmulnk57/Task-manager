const express =require('express');
const app = express();
const dotenv=require("dotenv");
const connectDatabase=require('./config/database');
const taskRoute=require('./routes/taskRoute');
const port =process.env.PORT;
app.use(express.json());


//config

require('dotenv').config();

app.use('/',taskRoute)
//database connection
connectDatabase();


//server listen
app.listen(process.env.PORT,()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`);
})