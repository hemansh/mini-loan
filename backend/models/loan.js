const { Sequelize } = require("sequelize");

module.exports = (seq,DataTypes)=>{
    const Loan = seq.define('loan',{
        userid: {
            type: Sequelize.INTEGER
        },
        amount: {type: Sequelize.BIGINT},
        status: {
            type: Sequelize.ENUM('REQ','APR','PAID')
        },
        term: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.DATE
        }
    },{})

    return Loan;
}