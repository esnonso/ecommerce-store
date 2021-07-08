const express = require('express');
const router = express.Router({mergeParams: true});
const { createProduct, getProduct, showProduct, removeProduct } = require('../Handlers/products')

router.route('/').get(getProduct)
.post(createProduct);
router.route('/:product_id')
.get(showProduct)
.delete(removeProduct)

module.exports = router;