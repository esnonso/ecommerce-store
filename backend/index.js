require('dotenv').config();
const express = require('express');
const  app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./Handlers/error');
const productRoutes = require('./Routes/products')
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/users');
const db = require('./Models');
const { loginIsRequired, isAdmin } = require("./Middleware/auth");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/admin/:id/', async function(req, res){
   try{
    const products = await db.Products.find({}) 
    return res.status(200).json(products)
   }catch(e){
       return(e)
   }
})

app.use("/api/auth", authRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/users', loginIsRequired, userRoutes);

app.use((req, res, next) => {
    let error = new Error('Request Not Found');
    error.status = 404;
    next(error)
});

app.use(errorHandler);

app.listen(3001, ()=> console.log('Server has started on port 3001'));