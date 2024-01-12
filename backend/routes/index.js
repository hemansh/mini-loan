const express = require('express');
const router = express.Router();
const customer = require('./customer')
const auth = require('./auth');
const admin = require('./admin');
const onlyLoggedIn = require('../middlewares/authm')
const onlyAdmin = require('../middlewares/admin')

router.use('/customer',onlyLoggedIn,customer);
router.use('/auth',auth)
router.use('/admin',onlyAdmin,admin);

module.exports = router;