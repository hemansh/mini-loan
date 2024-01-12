const controllers={};
controllers.user = require('./user');
controllers.loan = require('./customers');
controllers.admin = require('./admin');

module.exports = controllers;