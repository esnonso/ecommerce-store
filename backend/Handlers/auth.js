const db = require('../Models');
const jwt = require('jsonwebtoken');

const seeds = async function seeds() {
    //await db.User.remove({})
    await db.Cart.remove({})
    console.log("Cleared")
}
 //seeds()//Delete everything in the database

exports.signin = async function(req, res, next){
    try{
        let user = await db.User.findOne({
            email:req.body.email
        });
        let { id, username, firstname, surname, productCatalog, isAdmin} = user
        let isMatch = await user.comparePassword(req.body.password)
        if(isMatch){
            let token = jwt.sign({ 
                id,
                username,
                firstname,
                surname,
                isAdmin,
                productCatalog,
            }, process.env.SECRET_KEY)
            return res.status(200).json({
                id,
                username,
                firstname,
                surname,
                token,
                productCatalog,
                isAdmin
            })
        }else {
            return next({
                status:400,
                message:"invalid username or password"
            })
        }
    }catch(err){
        return next({
            status:400,
            message:"invalid username or password"
        }
        )
    }
  }
   
exports.signup = async function(req, res, next){
    try{
        //create a user
        let user = await db.User.create(req.body)
        const { id,  username, firstname, surname, productCatalog, isAdmin} = user
        let token = jwt.sign({
            id,
            username,
            firstname,
            surname,
            productCatalog,
            isAdmin
        }, process.env.SECRET_KEY)
        return res.status(200).json({
            id,
            username,
            firstname,
            surname,
            token,
            productCatalog,
            isAdmin
        }) 
    }catch(err){
        // code if validation fails
        if(err.code === 11000){
            err.message = "Sorry That username and/or email is taken"
        }
        return next({
            status:400,
            message:err.message
        })
    }
}
