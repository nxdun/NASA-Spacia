/*
*   @desc: hash the password before saving it to the database
*   @param: request, response, next
*   @return:Replaced password with the hashed password
*/

const bcrypt = require('bcryptjs');

async function hashPassword(req, res, next) {
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            req.body.password = hashedPassword;
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'An error occurred'});
    }
}

module.exports = hashPassword;