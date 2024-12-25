const { check } = require('express-validator');

exports.registerValidator = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
    check('userType').isIn(['admin', 'user']).withMessage('UserType must be either admin or user'),
];

exports.loginValidator = [
    check('email').isEmail().withMessage('Please provide a valid email'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
];
