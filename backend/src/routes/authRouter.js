const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRoles = require('../models/userRoles');
const hashPassword = require('../middleware/hashPassword');
const jwtAuth = require('../middleware/middlewareJwt');
const logger = require('../config/logger.js');
require('dotenv').config();

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
        res.status(200).json({ message: 'Login successful' });
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
    res.status(200).json({ message: 'Logout successful' });
});

// Forget password route
router.post('/forgetpassword', hashPassword, async (req, res) => {
    try {
        const { username, role, newpassword } = req.body;

        // Check if user is already logged in
        if (req.cookies.auth) {
            return res.status(400).json({ message: 'Please log out first' });
        }

        // Check if username and role are provided
        if (!username || !role || !newpassword) {
            return res.status(400).json({ message: 'Username, role, and new password are required' });
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
router.post('/validate', jwtAuth, async (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
});

module.exports = router;
