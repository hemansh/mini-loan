/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operations related to user authentication
 */

const express = require('express');
const router = express.Router();
const {user,admin} = require('./../controllers');

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     description: Endpoint for user registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for registration
 *               password:
 *                 type: string
 *                 description: The password for registration
 *     responses:
 *       '200':
 *         description: User registration successful
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/signup',user.createUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for login
 *               password:
 *                 type: string
 *                 description: The password for login
 *     responses:
 *       '200':
 *         description: User login successful
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/login',user.login);

/**
 * @swagger
 * /api/auth/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Endpoint for admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The admin username for login
 *               password:
 *                 type: string
 *                 description: The admin password for login
 *     responses:
 *       '200':
 *         description: Admin login successful
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/admin/login',admin.login);

module.exports = router;