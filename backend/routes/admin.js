/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Operations related to admin tasks
 */


const express = require('express');
const router = express.Router();
const {admin} = require('./../controllers');


/**
 * @swagger
 * /api/admin/getloans:
 *   get:
 *     summary: Get all loans (admin)
 *     description: Endpoint to retrieve a list of all loans (admin)
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/getloans',admin.getloans);

/**
 * @swagger
 * /api/admin/updateloan:
 *   put:
 *     summary: Update loan information (admin)
 *     description: Endpoint to update information about a loan (admin)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loanId:
 *                 type: string
 *                 description: The ID of the loan to update
 *               // Add other properties for updating loan information
 *     responses:
 *       '200':
 *         description: Loan information updated successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.put('/updateloan',admin.updateloan);

module.exports = router;