import exp from'express';
import { connect} from 'mongoose';
import { userRoute } from './APIs/userAPI.js';
import { productRoute } from './APIs/productAPI.js';
const app=exp()

async function connection() {
    try{
        await connect("mongodb://localhost:27017/ecodb");
        console.log("Connection to database done");
        app.listen(3000,()=>console.log("HTTP server listening on port 3000"));
    }catch(err){
        console.log("Connection failed");
    }
    
}
connection();

//body parsing middleware
app.use(exp.json())

//forward req to the specific APIs
app.use("/user-api",userRoute);
app.use("/product-api",productRoute);


//error handling middleware
app.use((err,req,res,next)=>{
    res.json({
        message:"Error has Occured",
        reason:err.message
    })
});



