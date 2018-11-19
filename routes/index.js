const User = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');
const errorHandler = require('../middlewares/errorHandlerMiddleware');

function showToDo(req, res) {
    const { JWTToken } = req.cookies;
    const { id } = jwt.decode(JWTToken);
    User.findOne({_id: id}, (err, item) => {
        if (err) return errorHandler(err, req, res);
        return res.json(JSON.stringify(item.toDo));
    });
}

module.exports = showToDo;