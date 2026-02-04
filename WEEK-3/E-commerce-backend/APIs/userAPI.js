import exp from'express';
import { UserModel } from '../models/UserModel.js';
import {hash} from 'bcryptjs'
import { ProductModel } from '../models/ProductModel.js';
//create mini express impo
import { Types } from 'mongoose';
export const userRoute=exp.Router();
//create user
userRoute.post("/users",async(req,res)=>{
    //get user from req
    let userObj=req.body
    //validate userObj
   await new UserModel(userObj).validate();
    //hash  password
    let hashedPassword=await hash(userObj.password,12);
    //replace plain text with hashed password
    userObj.password=hashedPassword;
    
    //create user document
    let userDoc=await new UserModel(userObj);
    await userDoc.save({validateBeforeSave:false});
    res.status(201).json({message:"user created"});
})

userRoute.get("/users",async(req,res)=>{
    let allUsers=await UserModel.find();
    if(allUsers==null){
        return res.status(400).json({message:"Users not found"})
    }
    res.status(200).json({message:"all Users",payload:allUsers})
})

//add products to cart
userRoute.put("/user-cart/user-id/:userId/product-id/:productId",async(req,res)=>{
    //read user id from url parameter
   let {userId,productId}=req.params;
    //check whether userId and productId exists in database
    //check user
    let user=await UserModel.findById(userId).populate("cart.product");
    if(!user){
        return res.status(401).json({message:"User Not Found"});
    }
    //check product
    let product=await ProductModel.findById(productId);
    if(!product){
        return res.status(401).json({message:"Product Not Found"});
    }
    //check product exists in cart
    let cartItems=user.cart.find(item => item.product.equals(productId));
    if(cartItems){
        //increment the quanitity by 1
        cartItems.quantity+=1;
    }
    else{
        //add the product to the cart and set the quantity as one
        user.cart.push({product:productId,quantity:1});
    }
    let modifiedUser = await user.save();
    res.status(200).json({message:"product added to cart",payload:modifiedUser});
    
    
    
})


//read user by id
userRoute.get("/users/:id",async(req,res)=>{
    //get user id
    let userId=req.params.id;
    //get user doc
    let user=await UserModel.findById(userId).populate("cart.product","productName price");
    if(!user){
        return res.status(401).json({message:"user Not found"});
    }
    return res.status(200).json({message:"User with Given id",payload:user});
})


//
userRoute.get("/compare/:id",async(req,res)=>{
    
})