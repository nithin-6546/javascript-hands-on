import exp, { json } from 'express';//importing express modules

import { userApp } from './APIs/user-api.js'
import { productApp } from './APIs/product-api.js';
//create HTTP server
//create server
const app=exp();
//assign port  number
app.listen(3000,()=>console.log('HTTP server listenening on port 3000'));

//body parsing middleware
app.use(exp.json())
app.use('/user-api',userApp)

app.use('/product-api',productApp);


