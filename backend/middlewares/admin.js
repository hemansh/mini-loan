const { getUser } = require("../service/authservice");


const onlyAdmin=(req,res,next)=>{
    const userUid = req.cookies?.uid;
    if(!userUid) return res.status(401).send("Unauthorised");
    const user = getUser(userUid);
    if(!user) return res.status(401).send("Unauthorised");

    req.user = user;
    next();
}

module.exports=onlyAdmin