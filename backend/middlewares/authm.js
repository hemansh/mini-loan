const { getUser } = require('../service/authservice');

const onlyLoggedIn=async(req,res,next)=>{
    const userUid = req.cookies?.uid;
    // console.log("cookie "+userUid)
    if(!userUid) return res.status(401).send("Unauthorised");
    const user = getUser(userUid);
    // console.log("userid "+user);
    if(!user) return res.status(401).send("Unauthorised");

    req.user = user;
    next();
}

module.exports=onlyLoggedIn;