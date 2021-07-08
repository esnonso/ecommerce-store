const db = require('../Models');

const seeds = async function seeds() {
    await db.Products.remove({})
    console.log("Cleared")
}

 //seeds()//Delete everything in the database

exports.createProduct = async function(req, res, next){
    try{
        let products = await db.Products.create(req.body)
        let {id, category, title, amount, description, features} = products;
        return res.status(200).json({
            id,
            category,
            title,
            amount,
            description,
            features,
        })
    }catch(error){
        return next(error)
    }
};

exports.getProduct = async function(req, res, next){
    try{
        let products = await db.Products.find({});
        return res.status(200).json(products)
    }catch(error){
        next(error)
    }
};

exports.showProduct = async function(req, res, next){
    try{
        let product = await db.Products.findById(req.params.product_id);
        return res.status(200).json([product])
    }catch(error){
        next(error)
    }
};

exports.removeProduct = async function (req, res, next){
    try{
        console.log(req.params.id)
        let product = await db.Products.findById(req.params.product_id);
        await product.remove()
        return res.status(200).json({message: "Deleted"})
    }catch(err){
        return(err)
    }
}

