const express = require('express');
const router = express.Router();
const {loan} = require('./../controllers');

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Operations related to customers
 */


/**
 * @swagger
 * /api/customer/requestloan:
 *   post:
 *     summary: Request a loan
 *     description: Endpoint to request a loan
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add your request payload properties here
 *     responses:
 *       '200':
 *         description: Loan request successful
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/requestloan',loan.requestLoan);
/**
 * @swagger
 * /api/customer/repay:
 *   post:
 *     summary: Repay a loan
 *     description: Endpoint to repay a loan
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add your request payload properties here
 *     responses:
 *       '200':
 *         description: Repayment successful
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/repay',loan.repay);
/**
 * @swagger
 * /api/customer/getloans:
 *   get:
 *     summary: Get all loans
 *     description: Endpoint to retrieve a list of all loans
 *     tags: [Customer]
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/getloans',loan.getloans);
/**
 * @swagger
 * /api/customer/customrepay:
 *   post:
 *     summary: Custom repayment endpoint
 *     description: An example of a custom repayment endpoint
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add your custom repayment payload properties here
 *     responses:
 *       '200':
 *         description: Custom repayment successful
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/customrepay',loan.customrepay);

router.get('/getpaidloans',loan.getPaidLoans);

module.exports = router;