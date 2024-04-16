const express = require('express');
const router = express.Router();
const UserRoles = require('../models/userRoles');
const logger = require('../config/logger.js');

// Middleware function to hash password before saving to database
const hashPassword = require('../middleware/hashPassword.js');

// GET a single user role by ID and return as JSON
router.get('/:id', (req, res) => {
    try{
    logger.debug('[userRoles] get user role by id request received with id: ' + req.params.id);
    res.json(res.userRole);
    }catch (error) {
        logger.error('[userRoles] get request failed with error: ' + error.message);
        res.status(500).json({ message: " :[  Looks Like Something bad happening in Server" });
    }
});

// CREATE a new user role and return result as JSON
router.post('/', hashPassword, async (req, res) => {

    try {
        logger.debug('[userRoles] create new user role request received');
        const userRole = new UserRoles({
            username: req.body.username,
            password: req.body.password
        });
        const newUserRole = await userRole.save();
        res.status(200).json(newUserRole);
    } catch (error) {
        logger.error('[userRoles] Create a new user role request failed with error: ' + error.message);
        res.status(500).json({ message: " :[  Looks Like Something bad happening in Server" });
    }
});

// UPDATE a user role
router.patch('/:id', hashPassword, async (req, res) => {

    try {
        logger.debug('[userRoles] update user role request received with id: ' + req.params.id);
        if (req.body.username != null) {
            res.userRole.username = req.body.username;
        }
        if (req.body.password != null) {
            res.userRole.password = req.body.password;
        }

        const updatedUserRole = await res.userRole.save();
        res.json(updatedUserRole);
    } catch (error) {
        logger.error('[userRoles] update user request failed with error: ' + error.message);
        res.status(500).json({ message: " :[  Looks Like Something bad happening in Server" });
    }
});

// DELETE a user role
router.delete('/:id', async (req, res) => {

    logger.info('[userRolesRoutes] delete user role request received with id: ' + req.params.id);
    try {
        await UserRoles.findByIdAndDelete(req.params.id);
        res.json({ message: 'User role deleted' });
    } catch (error) {
        logger.error('[userRolesRoutes] Delete request failed with error: ' + error.message);
        res.status(500).json({ message: " :[  Looks Like input not allowed" });
    }
});

module.exports = router;
