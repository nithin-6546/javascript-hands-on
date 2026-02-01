import exp from 'express';
import { connect } from 'mongoose';
import { userApp } from './API/userAPI.js';
import { productApp } from './API/productAPI.js';
const app=exp()

//connect to db server
async function connection(){
    try{
    await connect('mongodb://localhost:27017/productsdb')
    console.log("Connected to database");
    //after the successful db connection then assign a port to webserver 
    app.listen(3000,()=> console.log("server listening on port 3000..."));
    }catch(err){
        console.log("error in connecting database",err)
    }
    
}
connection()
//assign a port
app.use(exp.json())
app.use('/userAPI',userApp);
app.use('/productAPI',productApp)


//error handling middleware
app.use((err,req,res ,next)=>{
    res.status(400).json({
        message:"Error has occured",
        reason:err.message
    })
})