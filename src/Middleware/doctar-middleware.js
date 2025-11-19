const doctarMiddleware = async(req,res,next)=>{
    if(req.userInfo && req.userInfo.role === 'doctar'){
    next();
  } else {
    return res.status(403).json({ message: "Only doctors can create appointments" });
  }
}
module.exports = doctarMiddleware;