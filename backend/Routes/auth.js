const express = require("express");
const router = express.Router();
const { signup, signin } = require("../handlers/auth")

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/', (req, res)=> res.send("Hit"));

module.exports = router;