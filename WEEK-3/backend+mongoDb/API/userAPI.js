import exp from 'express';
//import UserModel to perform database operations
import { UserModel } from '../model/usermodel.js';
//create a mini express (routing)
export const userApp=exp.Router()

//get handler route 
userApp.get("/users",async(req,res)=>{
  //userList stores all the users
  let usersList= await UserModel.find()
    res.status(200).json({message:"All users",payload:usersList});
})

//get handler route  with url paramter object id 
userApp.get("/users/:id",async(req,res)=>{
  //get object id from url parameter
  let objId=req.params.id;
  //find user obj
  let userObj=await UserModel.findById(objId);
  //if userobj does not exists return res as not found
  if(userObj === null){
      return res.status(404).json({message:"User Not Found"});
    }
  res.status(200).json({message:"User with given object Id",payload:userObj});

})

//create user
userApp.post('/users',async(req,res)=>{
  //get newUser from req
  let newUser=req.body
  //create a user document
  let newUserDoc=await new  UserModel(newUser);
  await newUserDoc.save()
  res.status(200).json({message:"User Created"});
})

//update user
userApp.put("/users/:id",async(req,res)=>{
    //get objId from url parameters
    let objId=req.params.id;
    //get modified user
    let modifyUser=req.body
    //make update
    let latestUser= await UserModel.findByIdAndUpdate(objId,{$set:{...modifyUser}},{new:true})
    // check user exists or not
    if(latestUser === null){
      return res.status(404).json({message:"User Not Found"});
    }
    res.status(200).json({message:"User Modified",payload:latestUser})
})

//delete the user
userApp.delete("/users/:id",async(req,res)=>{
  let objId=req.params.id;
  let deletedUser=await UserModel.findByIdAndDelete(objId);
  // check user exists or not
  if(deletedUser === null){
      return res.status(404).json({message:"User Not Found"});
    }
  res.status(200).json({message:"Deleted User",payload:deletedUser});
})