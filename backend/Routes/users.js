const express = require("express");
const router = express.Router({mergeParams: true})
const { userProfile, userProducts, addToUserCart } = require('../Handlers/user')
const db = require('../Models')

router.route('/:id').get(userProfile);
router.route('/:id/cart').post(addToUserCart);
router.route('/:id/products').get(userProducts);


module.exports = router;