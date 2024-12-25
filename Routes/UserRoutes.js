const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/UserController');
const UserValidator = require('../Validators/UserValidator');

router.post("/register",UserValidator.registerValidator,UserController.registerUser);

module.exports = router;