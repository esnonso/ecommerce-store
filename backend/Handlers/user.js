const db = require('../Models');

exports.userProfile = async function(req, res) {
    try{
        const user = await db.User.findById(req.params.id)
        return res.status(200).json(user)
    }catch(err) {
        return (err)
    }
}

exports.userProducts = async function(req, res){
    try{
        const cart = await db.Cart.find({user:req.params.id})
        .populate("productCatalog", {
        products:true,
        delivered:true,
        paid:true,
    })
    return res.status(200).json(cart)
    }catch(err){
        return (err)
    }
}

exports.addToUserCart = async function(req, res){
    try{
        const cart = await db.Cart.create({
            products:req.body.products,
            user:req.params.id
        });
        let foundUser = await db.User.findById(req.params.id)
        foundUser.productCatalog.push(cart._id)
        //user.productCatalog.push(req.body)
        await foundUser.save()
  
        let foundCart = await db.Cart.findById(cart._id).populate("user", {
            firstname: true,
            surname:true
        })
        return res.status(200).json(foundCart)
    }catch(err){
        next(err)
    }
}