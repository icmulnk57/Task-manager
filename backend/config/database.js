const mongoose=require("mongoose");

const connectDatabase=()=>{
    mongoose.connect('mongodb://localhost:27017/TaskManager',{
        useUnifiedTopology:true,
        
    }).then((data)=>{
        console.log(`connection succsessfull at: ${data.connection.host}`)
    }).catch((err)=>{
        console.log("error found: ",err);
    })
}


module.exports=connectDatabase;