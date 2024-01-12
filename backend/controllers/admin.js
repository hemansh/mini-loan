require('dotenv').config({path: '../.env'});
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/authservice');
const {models:{Loan}} = require('../models');

const login=(req,res)=>{
    if(req.body.email && req.body.password){
        const {email,password} = req.body;
        if((email == process.env.ADMIN_EMAIL) && (password == process.env.ADMIN_PASSWORD)){
            const sessionid = uuidv4();
            setUser(sessionid,"ADMIN");
            // console.log(sessionid);
            res.cookie('uid',sessionid);
            res.status(200).send("admin login successful");
        } else {
            res.status(404).send("not found");
        }
    } else {
        res.status(500).send("Internal Server Error");
    }
}

const getloans=async(req,res)=>{
    try{
        const lon = await Loan.findAll();
        if(lon){
            res.json(lon).status(200);
        }
    } catch(err){
        res.status(500).send("Internal server error");
    }
}

const updateloan=async(req,res)=>{
    const {id} = req.body;
    try{
        const lon = await Loan.update({status:"APR"},{where:{id:id}});
        if(lon){
            res.status(200).send("success");
        } else {
            res.status(404).send("not found");
        }
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
module.exports={login,getloans,updateloan};