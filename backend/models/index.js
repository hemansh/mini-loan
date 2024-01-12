require('dotenv').config({path: '../.env'});
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require('./user')(sequelize,Sequelize.DataTypes);
db.models.Loan = require('./loan')(sequelize,sequelize.DataTypes);

module.exports = db;