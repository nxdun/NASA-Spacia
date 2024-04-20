const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRoles = require('../models/userRoles');
const hashPassword = require('../middleware/hashPassword');
const jwtAuth = require('../middleware/middlewareJwt');
const logger = require('../config/logger.js');
require('dotenv').config();
const axios = require('axios');

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user is already logged in
        if (req.cookies.auth) {
            return res.status(400).json({ message: 'User already logged in' });
        }

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user by username
        const userRole = await UserRoles.findOne({ username });

        if (!userRole) {
            logger.error(`[getUserRole] User ${username} not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, userRole.password);

        if (!validPassword) {
            logger.error(`Invalid login attempt: ${username}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: userRole.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set JWT token as cookie
        res.cookie('auth', token);
        //set header
        res.header('auth', token);
        
        res.status(200).json({ message: 'Login successful', token : token });
    } catch (error) {
        logger.error(`Login error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Register route
router.post('/register', hashPassword, async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user is already logged in
        if (req.cookies.auth) {
            return res.status(400).json({ message: 'Please log out first' });
        }

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Create new user role
        const newUserRole = await UserRoles.create({ username, password });

        logger.info(`New user role created successfully with id: ${newUserRole._id}`);
        res.status(200).json({ message: 'Successfully registered' });
    } catch (error) {
        logger.error(`Registration error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.header('auth', '');
    res.status(200).json({ message: 'Logout successful' });
});

// Forget password route
router.post('/forgetpassword', hashPassword, async (req, res) => {
    try {
        const { username, newpassword } = req.body;

        // Check if user is already logged in
        if (req.cookies.auth) {
            return res.status(400).json({ message: 'user already logged in' });
        }

        // Check if username and role are provided
        if (!username || !role || !newpassword) {
            return res.status(400).json({ message: 'Username, and new password are required' });
        }

        // Find user by username
        const userRole = await UserRoles.findOne({ username });

        if (!userRole) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Update password
        userRole.password = newpassword;
        await userRole.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        logger.error(`Forget password error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Validate token route
router.get('/validate', jwtAuth, async (req, res) => {
    res.status(200).json({ message: 'Token is valid'});
});

router.post('/capcheck', async (req, res) => {
    console.log("capcheck recived ", JSON.stringify(req.body));
    try{
        if(!req.body.captcha){
            return res.status(400).json({ message: 'CapToken is required' });
        }
        const secretKey = process.env.CAPTCHA_SECRET_KEY;
        const googleUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;
       
        const response = await axios.post(googleUrl);
        if(response.data.success){
            res.status(200).json({ message: 'CapToken is valid', success: true });
        }else{
            res.status(400).json({ message: 'CapToken is invalid', success: false });
        }

    }
    catch (error) {
        logger.error(`Cap check error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error', success: false});
    }
});

module.exports = router;
