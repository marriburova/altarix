const User = require('../schemas/userSchema');
const errorHandler = require('../middlewares/errorHandlerMiddleware');
const createHash = require('../helpers/password');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { validateEmail, validatePassword } = require('../middlewares/validateMiddleware');

function signUp (req, res) {
    if (!validateEmail(req.body.email)) {
        return res.status(401).json({error: 'Invalid email'});
    }
    if (!validatePassword(req.body.password)) {
        return res.status(401).json({error: 'The password must be longer than 8 characters and must contain at least one uppercase letter, one lowercase letter and one number'});
    }
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: createHash(req.body.password)
    });
    User.findOne({ 'email': newUser.email}, (err, user) => {
        if (err) return errorHandler(err, res, req);
        if (user) return res.status(400).json({error: 'Email already exists!'});
        else {
            newUser.save()
                .then(()=> {
                    return res.status(200).json({ success: 'New user has been created' });
                })
                .catch(err => {
                    return errorHandler(err, res, req);
                });
        }
    });
}

function logIn(req, res) {
    if (!validateEmail(req.body.email)) {
        return res.status(401).json({error: 'Invalid email'});
    }
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (err) return errorHandler(err, res. req);

        if (!user) {
            return res.status(401).json({ error: 'Please, sign up!' }).redirect('/signup');
        }

        if (user.password === createHash(req.body.password)) {
            res.cookie('JWTToken', jwt.sign({ id: user._id.toString() }, JWT_SECRET));
            return res.status(200).json({ success: 'Authorized successfully' });
        } else {
            return res.status(401).json({ error: 'Unauthorized access'});
        }
    })
};

function logOut(req, res) {
    const { JWTToken } = req.cookies;
    const {id} = jwt.decode(JWTToken);
    User.findById(id, (err, user) => {
        if (err) return errorHandler(err, res. req);
        if (!user) {
            return res.status(401).json({ success: 'Please, login!' }).redirect('/login');
        }
        res.cookie('JWTToken', '', { expires: new Date(0) });

        return res.status(200).json({ success: 'Logout' });
    })
};

module.exports = {
    signUp,
    logIn,
    logOut
}
