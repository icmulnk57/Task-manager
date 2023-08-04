const express =require('express');
const app = express();
const dotenv=require("dotenv");
const connectDatabase=require('./config/database');
const taskRoute=require('./routes/taskRoute');
const port =process.env.PORT || 5000;
app.use(express.json());


//config
dotenv.config({ path: 'backend/config/config.env' });

app.use('/',taskRoute)
//database connection
connectDatabase();


//server listen
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})