import exp from'express';
import { ProductModel } from '../models/ProductModel.js';

//create mini express 
export const productRoute=exp.Router();


//route to create a new product
productRoute.post('/products',async(req,res)=>{
    //get product from req
    let productObj=req.body;
    //create product document
    let productDoc=await new ProductModel(productObj);
    await productDoc.save();
    res.status(201).json({message:"Product Created"});
})

//route to read all the products
productRoute.get("/products",async(req,res)=>{
    let allProducts=await ProductModel.find();
    if(allProducts==null){
        return res.status(400).json({message:"Products are empty"})
    }
    res.status(200).json({message:"all products",payload:allProducts})
})