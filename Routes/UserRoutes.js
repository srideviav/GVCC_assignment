const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/UserController');
const UserValidator = require('../Validators/UserValidator');
const {verifyToken} = require('../Middlewares/auth');

router.post("/register",UserValidator.registerValidator,UserController.registerUser);
router.post("/login",UserValidator.loginValidator,UserController.loginUser);
router.get("/get",verifyToken,UserController.getUser);

module.exports = router;