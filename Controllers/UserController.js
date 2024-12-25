const { ifUserExistsService, saveUserService, ifPasswordMatch } = require('../Services/UserSErvices');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userDetails = req.body;
    try {
        const userExists = await ifUserExistsService(userDetails?.email);
        if (!userExists) {
            const registeredData = await saveUserService(userDetails)
            res.json({
                status: true,
                message: "User Registered Successfully",
                data: registeredData,
            });
        } else {
            res.json({
                status: false,
                message: "User Already Exists",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.json({
            status: false,
            message: "Something Went Wrong",
            error: error.message,
        });
    }
};

exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userDetails = req.body;
    try {
        const userExists = await ifUserExistsService(userDetails?.email);
        console.log(userExists, "is user exists")
        if (!userExists) {
            res.json({
                status: false,
                message: "Incorrect Email",
            });
        }

        if (userExists) {
            const passwordMatch = await ifPasswordMatch(userDetails?.password, userExists?.password)
            console.log(passwordMatch, "is password matches")
            if (!passwordMatch) {
                res.json({
                    status: false,
                    message: "Incorrect Password",
                });
            }
        }
        res.json({
            status: true,
            message: "User Login Successfully"
        })
    } catch (error) {
        console.error("Error:", error);
        res.json({
            status: false,
            message: "Something Went Wrong",
            error: error.message,
        });
    }

}