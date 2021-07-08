const { request } = require('express');
const jwt = require("jsonwebtoken");
const { db } = require('../Models/user');


exports.loginIsRequired =  function(req, res, next){
    try{
        const authHeader = req.headers.authorization;
        if(authHeader){
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.SECRET_KEY, (err, user)=> {
                if(err){
                    return res.status(403);
                }
                req.user = user;
                next()
            })
        }else{
            return next({
                status:403,
                message:"No auth header"
            })
        }
   
    }catch(err){
        return next({
            status:403,
            message:"You are not properly logged in" 
        })
    }
}

exports.isAdmin =  function(req, res, next){
    try{
        const authHeader = req.headers.authorization;
        if(authHeader){
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.SECRET_KEY, (err, user)=> {
                if(err){
                    return res.status(403);
                }
                req.user = user;
                if(req.user.isAdmin){
                    next()
                }else{
                    return res.status(403);  
                }
            })
        }else{
            return next({
                status:403,
                message:"Unauthorized Access"
            })
        }
   
    }catch(err){
        return next({
            status:403,
            message:"Unauthorized Access" 
        })
    }
}
