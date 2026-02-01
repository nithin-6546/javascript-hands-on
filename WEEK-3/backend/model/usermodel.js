import { Schema,model } from "mongoose";
//create user Schema (username,password,age)
const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"User Name is Required"],
        minLength:[4,"Minimum length should be 4"],
        maxLength:[6,"Maximum length exceeded"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    age:{
        type:Number,
        required:[true,"Age is required"],
        min:[18,"Age should be above 18"],
        max:[25,"Age Should be below 25"]
    },
},{
    strict:"throw",
    timestamp:true
}
);

//create user model with that schema
export const UserModel=model("user",userSchema)