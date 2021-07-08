const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    features:[{
        type:String,
        required:true
    }]
})

const Products = mongoose.model("Products", productSchema)

module.exports = Products;