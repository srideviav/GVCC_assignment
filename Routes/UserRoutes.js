const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/UserController');
const UserValidator = require('../Validators/UserValidator');

router.post("/register",UserValidator.registerValidator,UserController.registerUser);
router.post("/login",UserValidator.loginValidator,UserController.loginUser);

module.exports = router;