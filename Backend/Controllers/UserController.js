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
            res.json({
                status: false,
                message: "Incorrect Email",
            });
        }

        if (userExists) {
            const passwordMatch = await ifPasswordMatch(userDetails?.password, userExists?.password)
             if (!passwordMatch) {
                res.json({
                    status: false,
                    message: "Incorrect Password",
                });
            }
        }
        const token = jwt.sign(
            { id: userExists._id, email: userExists.email, userType: userExists.userType }, // Payload
            process.env.JWT_SECRET, // Secret key (store securely in .env file)
            { expiresIn: '1h' } // Token expiration
        );
        res.json({
            status: true,
            message: "User Login Successfully",
            data:userExists,
            token:token
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