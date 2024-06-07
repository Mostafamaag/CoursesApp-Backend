
const jwt = require('jsonwebtoken');
module.exports = async (poyload) => {
    const token =  jwt.sign(
        poyload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1m' });

    return token;
}