import exp, { json } from 'express';
// create a mini express(seperate Route) app
export const productApp=exp.Router();

//create an empty array to store products
let products=[];



    //get request handler to provide all products
    productApp.get("/products",(req,res)=>{
        res.status(200).json({message:"All Products",payload:products});
    })




    //get request handler to provide product details with given id
    productApp.get("/products-id/:id",(req,res)=>{
        //using Number class we can convert string into Integer
        //params is used to get parameter values
        let productid=Number(req.params.id);
        //check whether the product is available with given id by using find()
        let product=products.find(p => p.productId === productid);
        //if product not found then send res as product not found
        if(!product){
            return res.status(404).json({message:"Product Not Found"});
        }
        //send product details as response
        res.status(200).json({message:"Product ",payload:product});
    })



    //get request handler to provide products with given brand
    productApp.get("/products-brand/:Brand",(req,res)=>{
        //get brand name
        let brandName=req.params.Brand.toLowerCase();
        //using filter method get all the products that match with given brand
        let productsWithGivenBrand=products.filter(p => p.Brand.toLowerCase() === brandName);
        //if the length is zero then there are no products with given brand
        if(productsWithGivenBrand.length ===0){
            return res.status(404).json({message:"Product not found for a Given Brand"});
        }
        res.status(200).json({message:"Products with Given brand",payload:productsWithGivenBrand})
    })



//post request handler to create product  
productApp.post("/products",(req,res)=>{
    let product=req.body // get product 
    //insert product into the array
    products.push(product);
    //send response with status code 200-OK
    res.status(200).json({message:"product Created"});
});



//put req handler to modify the existing product that matches id
productApp.put("/products",(req,res)=>{
    //get product 
    let modifyProduct=req.body
    //find the index of the product using findIndex();
    let productIndex=products.findIndex(p => p.productId === modifyProduct.productId)
    //If product not found then send res as product not found 
        if(productIndex===-1){
           return res.status(404).json({message:"Product Not Found"})
        }
    //using splice() method replace the  product
    let deletedProduct=products.splice(productIndex,1,modifyProduct);
    res.status(200).json({message:"Product Updated successfully"});
})



//delete req handler
productApp.delete('/products/:id',(req,res)=>{
    //get the product id
    let productId=Number(req.params.id);
    //get productIndex 
    let productIndex=products.findIndex(p => p.productId === productId)
    if(productIndex ===-1){
        return res.status(404).json({message:"Product Not Found with Given Id"});
    }
    let product=products.splice(productIndex,1)
    res.status(200).json({message:"Product Deleted",payload:product});
})