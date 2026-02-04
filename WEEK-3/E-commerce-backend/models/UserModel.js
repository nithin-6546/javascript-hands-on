import { Schema,model } from "mongoose";


//create a cart schema
// const cartSchema=new Schema({
//     product:{
//         type:Schema.Types.ObjectId,
//         ref:"product" //name of product model
//     }
    
// }
// )
const cartSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"product" //name of product model
    },
    quantity:{
        type:Number,
        default:1
    }
    
}
)

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    email:{
        type:String,
        required:[true,"email is Required"],
        unique:[true,"Duplicate user"] // add to index
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    cart:{
        type:[cartSchema]
    }

})

export const UserModel=model("user",userSchema);