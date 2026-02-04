import { Schema,model } from "mongoose";

//create a schema {pid,productName,price}
let productSchema=new Schema({
    pid:{
        type:Number,
        required:[true,"product Id is required"]
    },
    productName:{
        type:String,
        minLength:[4,"minimum length of product name must contain 4 characters"],
        maxLength:[10,"product Name exceeds 10 characters"]
    },
    price:{
        type:Number,
        min:[1000,"minimum price of product is 1000"],
        max:[100000,"Maximum price of product can be 10000"]
    }
},{
    strict:"throw",
    timestamp:true
}
)

//create a model
export let ProductModel=model("product",productSchema);