import exp, { json } from 'express';
// create a mini express(seperate Route) app
export const userApp=exp.Router();

//test local memory data
let users=[];

//create API(req handlers -route)
    //get request handling route
    userApp.get('/users',(req,res)=>{
        //send response to client
        //send users data in response
        res.status(200).json({message:"All Users Data",payload:users});
    })

    // get request handler route using id
    userApp.get('/users/:id',(req,res)=>{
        //read id from url parameter
        let userId=Number(req.params.id)//params returns an obj
        //read user by id
        let user=users.find(u => u.id === userId);
        //send response 
        if(!user){
           return res.status(404).json({message:"User Not Found"});
        }
        res.status(200).json({message:'User',payload:user })
        

    })
    //post request handling route to create users
    userApp.post('/users',(req,res)=>{
    //get user resource from req
       let newUser= req.body
    // console.log("New user",newUser)
    //insert newUser into users array
    users.push(newUser);
    res.status(200).json({message:"User created"});

    })
    //put request handling route for modifying existing data
    userApp.put('/user/id',(req,res)=>{
        //get modified user from request
        let modifyUser=req.body
        //find the user exists in users array with id
        let userIndex=users.findIndex(u => u.id===modifyUser.id)
        //If user not found then send res as user not found 
        if(userIndex===-1){
           return res.status(404).json({message:"User Not Found"})
        }
        //if user found then modify the user and send res as user modifed
        let deletedUser=users.splice(userIndex,1,modifyUser)
        res.status(200).json({message:"User Modified"});
    })
    //delete request handling route to delete user by id
    userApp.delete('/user/:id',(req,res)=>{
        //get user id to be deleted
        let userId=Number(req.params.id);//reading id
        //find the position of product
        let userIndex=users.findIndex(u => u.id === userId);
        if(userIndex=== -1){
            return res.status(404).json({message:"User Not Found"})
        }
        //delete user by using splice() method
        let deletedUser=users.splice(userIndex,1)
        res.status(200).json({message:"Deleted User",payload:deletedUser})
    })