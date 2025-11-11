const jwt = require("jsonwebtoken");
require("dotenv");

const authmiddleware = (req, res,next)=>{
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ");

    if(!token){
        return res.status(401).json({
            message: "user denied!"
        })
    }

    try{
        const decoded_token = jwt.verify(token[1],process.env.JWT_SECRET_KEY);
        req.userInfo = decoded_token;
        next();
    }catch(error){
        res.status(401).json({
            message: "token Expired !"
        })
    }
}

module.exports = authmiddleware;