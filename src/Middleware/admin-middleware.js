const adminMiddleware = (req,res,next) => {
    if(req.userInfo.role !== "doctar"){
        return res.status(400).json({
            message: "This role is not allowed"
        });
    }
    next();
}

module.exports =  adminMiddleware;