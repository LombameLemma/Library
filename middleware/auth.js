const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Accept either Authorization or x-auth-token
    let token = req.header('Authorization') || req.header('x-auth-token');

    if (!token) return res.status(401).json({ message: "No token, access denied" });

    // Remove "Bearer " if present
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trim();
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};