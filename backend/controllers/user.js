const {models:{User}} = require('../models');
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/authservice');

const createUser = async(req,res)=>{
    if(req.body.username && req.body.password) {
        const {username,password} = req.body;

        const usr = await User.create({
            username,
            password
        });
        console.log(usr);
        const sessionid = uuidv4();
        setUser(sessionid,usr);
        res.cookie('uid',sessionid);
        res.send("User created sucessfully").status(200);
    } else {
        res.send("ERROR not added to DATABASE").status(500);
    }
}

const login = async(req,res)=>{
    console.log(req.body)
    const {username,password} = req.body;
    const usr = await User.findOne({where:{username:username}});
    if(usr === null){
        res.status(404).send("User not found");
    } else {
        if(usr.password == password){
            console.log("success");
            const sessionid = uuidv4();
            setUser(sessionid,usr);
            console.log(sessionid);
            res.cookie('uid',sessionid);
            res.status(200).send("success");
        } else {
            res.status(404).send("wrong password");
        }
    }
}

module.exports = {createUser,login};