const {models:{Loan}} = require('../models');

const requestLoan = async(req,res)=>{
    if(req.body.amount > 0 && req.body.status == 'REQ' && req.user){
        const {amount,status,term} = req.body;
        const usrid = req.user.id;
        console.log(usrid)
        let todayDate = new Date().toISOString().slice(0, 10);
        await Loan.create({
            userid:usrid,
            amount:amount,
            status:status,
            term:term,
            date:todayDate
        });
        res.status(200).send("loan successfully requested wait for admin approval");
    } else {
        res.status(401).send("Server Error");
    }
}

const repay = async(req,res)=>{
    const {id} = req.body;
    let lon = await Loan.findOne({where:{id:id}});

    if(lon.status == 'REQ'){
        res.status(200).send("Please wait for admin approval");
        return;
    }
    let amt = lon.amount;
    let trm = lon.term;
    amt -= parseInt(amt/trm);
    trm -= 1;
    let d = new Date();
    d.setDate(d.getDate()+7);
    let nextdate = d.toISOString().slice(0, 10);
    try{
        if(trm == 0){
            await lon.update({amount: amt,term: trm,status:"PAID",date:nextdate});   
        } else {
            await lon.update({amount: amt,term: trm,date:nextdate});
        }
        await lon.save();
        res.status(200).send("payment done Thank you");
    } catch(err){
        console.log(err);
        res.status(400).send("inernal server error");
    }

}

const customrepay=async(req,res)=>{
    const {id,amount} = req.body;
    let lon = await Loan.findOne({where:{id:id}});

    if(lon.status == 'REQ'){
        res.status(200).send("Please wait for admin approval");
        return;
    }
    let amt = lon.amount;
    let trm = lon.term;
    amt -= amount;
    trm -= 1;
    let d = new Date();
    d.setDate(d.getDate()+7);
    let nextdate = d.toISOString().slice(0, 10);
    try{
        if(trm == 0 || amt <= 0){
            await lon.update({amount: amt,term: trm,status:"PAID"});   
        } else {
            await lon.update({amount: amt,term: trm,date:nextdate});
        }
        await lon.save();
        res.status(200).send("payment done Thank you");
    } catch(err){
        console.log(err);
        res.status(400).send("inernal server error");
    }

}

const getloans = async(req,res)=>{
    // console.log(req);
    const usrid = req.user.id;
    // console.log(req.user);
    const usr = await Loan.findAll({where:{userid:usrid}});
    // console.log(usr)
    return res.json(usr).status(200);
}

module.exports = {requestLoan,repay,getloans,customrepay};