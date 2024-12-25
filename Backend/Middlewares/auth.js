const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res
        .status(401)
        .json({
            status:false,
            message:"Token Required"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded ;
        next();

    } catch (error) {
        console.log("jwt err : ", error)
        res.status(401).json({ status: false, message: 'Something Went Wrong',error:error?.message });
    }
}