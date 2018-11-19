const User = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');

function authenticationMiddleware () {
    return function (req, res, next) {
        const { JWTToken } = req.cookies;
        if (JWTToken) {
            const {id} = jwt.decode(JWTToken);
            if (User.findById({'_id': id})) {
                return next();
            }
        }
        res.redirect('/login');
    }
}

module.exports = authenticationMiddleware;