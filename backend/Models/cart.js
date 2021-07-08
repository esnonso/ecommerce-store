const mongoose = require('mongoose');
const User = require('./user');

const cartSchema = new mongoose.Schema({
    products:[],
    paid:{
        type:Boolean,
        default:false
    },
    delivered:{
        type:Boolean,
        default:false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps:true
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;