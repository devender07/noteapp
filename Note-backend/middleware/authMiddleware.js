const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided' });
    }
    try {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err);
                return res.status(403).json("Token is not valid!");
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Error in middleware:", error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
