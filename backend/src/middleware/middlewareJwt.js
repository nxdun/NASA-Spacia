/*
*   @desc: Middleware to verify the JWT token
*   @param: request, response, next
*   @return: JSON object
*/
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

function jwtAuth(req, res, next) {
    const token = req.cookies.auth;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = jwtAuth;
