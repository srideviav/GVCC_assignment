const { ifUserExistsService, saveUserService, ifPasswordMatch, getAllUser } = require('../Services/UserSErvices');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

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
        if (!userExists) {
            return res.json({
                status: false,
                message: "Incorrect Email",
            });
        }
        const passwordMatch = await ifPasswordMatch(userDetails?.password, userExists?.password);
        if (!passwordMatch) {
            return res.json({
                status: false,
                message: "Incorrect Password",
            });
        }

        const token = jwt.sign(
            { id: userExists._id, email: userExists.email, userType: userExists.userType }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "1h" } // Token expiration
        );

        return res.json({
            status: true,
            message: "User Login Successfully",
            data: userExists,
            token: token,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong",
            error: error.message,
        });
    }
};


exports.getUser = async (req,res) => {
    const user = req.user;
     if(user && user.userType === 'user'){
        const result = await ifUserExistsService(user?.email);
         return res.json({
            status:true,
            message:"User Details",
            data : result
        })
    }
    if(user && user.userType === 'admin'){
        const result = await getAllUser();
         return res.json({
            status:true,
            message:"All User Details",
            data : result
        })
    }

     
}