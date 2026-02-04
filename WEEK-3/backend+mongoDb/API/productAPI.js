import exp from 'express';
import { ProductModel } from '../model/productmodel.js';
//create a mini express route
export const productApp=exp.Router()


//read all products
productApp.get("/products",async(req,res)=>{
    let products= await ProductModel.find()
    res.status(200).json({message:"All Products",payload:products})
})

//read a product by object id
productApp.get("/products/:id",async(req,res)=>{
    let objId=req.params.id;
    let productObj=await ProductModel.findById(objId);
    if(productObj === null){
        return res.status(200).json({message:"Product Not Found"});
    }
    res.status(200).json({message:"Product with given object id",payload:productObj});
})

//create  a product
productApp.post("/products",async(req,res)=>{
    //get new product from req
    let newProduct=req.body;
    //create a product document
    let newProductDoc=await ProductModel(newProduct)
    await newProductDoc.save();
    res.status(200).json({message:"Product created"});
})

//modify the product
productApp.put("/products/:id",async (req,res) => {
    let objId=req.params.id;
    let modifyObject=req.body;
    let latestProduct=await ProductModel.findByIdAndUpdate(objId,{$set:{...modifyObject}},{new:true,runValidators:true})
    if(latestProduct === null){
        return res.status(200).json({message:"Product Not Found"});
    }
    res.status(200).json({message:"Product modified",payload:latestProduct});
})

//delete the product
productApp.delete("/products/:id",async(req,res)=>{
    //get obj id from url parameters
    let objId=req.params.id;
    let deletedId=await ProductModel.findByIdAndDelete(objId);
    //check if id exists or not
    if(deletedId === null){
        return res.status(200).json({message:"Product Not Found"});
    }
    res.status(200).json({message:"Product deleted",payload:deletedId});
})