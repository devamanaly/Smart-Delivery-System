const jsonwebtoken = require('jsonwebtoken')
const logger = require('../app')

const auth = (req, res, next) => {

    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({ error: `No token provided ` })
    }

    const token = authHeader && authHeader.split(' ')[1];

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            res.status(401).json({ error: `Invalid Token. ${err}` })
        }

        req.user = decode;
        next();

    })
}

module.exports = auth;