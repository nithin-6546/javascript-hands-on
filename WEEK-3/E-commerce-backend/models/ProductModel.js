import { Schema,model } from "mongoose";

const productSchema=new Schema({
    productName:{
        type:String,
        required:[true,"Product Name Required"]
    },
    price:{
        type:Number,
        required:[true,"Product price required"]
    },
    brand:{
        type:String,
        required:[true,"Product brand required"]
    }
},{
    strict:"throw",
    timestamps:true,
    versionKey:false
})

export const ProductModel=model("product",productSchema)