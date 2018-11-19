const User = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');
const errorHandler = require('../middlewares/errorHandlerMiddleware');
const { validateStatus } = require('../middlewares/validateMiddleware');

function createToDo(req, res) {
    const newToDo = {
        text: req.body.text,
        status: req.body.status || 'Execute'
    };


    const { JWTToken } = req.cookies;
    const { id } = jwt.decode(JWTToken);
    if(!newToDo.text) {
        return res.status(401).json({ error: 'Enter ToDo text!' });
    }

    if(!validateStatus(newToDo.status)) {
        return res.status(401).json({ error: 'Status must be Execute, Completed or Canceled' });
    }
    User.findByIdAndUpdate(id, {$push: {toDo: newToDo}}, (err) => {
        if (err) return errorHandler(err, req, res);
        return res.status(200).json({ success: 'ToDo created' });
    });
}

function updateToDo(req, res) {
    const { JWTToken } = req.cookies;
    const { id } = jwt.decode(JWTToken);

    const toDoId = req.body.id;
    const text = req.body.text;
    const status = req.body.status;

    if(!validateStatus(status)) {
        return res.status(401).json({ error: 'Status must be Execute, Completed or Canceled' });
    }
    if(text) {
        User.updateOne({ '_id': id, 'toDo._id': toDoId }, {$set: {'toDo.$.text': text}}, (err) => {
            if (err) return errorHandler(err, req, res);
        });
    }
    if (status) {
        User.updateOne({ '_id': id, 'toDo._id': toDoId }, {$set: {'toDo.$.status': status}}, (err) => {
            if (err) return errorHandler(err, req, res);
        });
    }
    return res.status(200).json({ success: 'ToDo updated' });

}

function deleteToDo(req, res) {
    const { JWTToken } = req.cookies;
    const { id } = jwt.decode(JWTToken);

    const toDoId = req.body.id;

    User.updateOne({ '_id': id }, {$pull: {'toDo': {'_id': toDoId }}}, (err) => {
        if (err) return errorHandler(err, req, res);
        return res.status(200).json({ success: 'ToDo deleted' });
    });
}

module.exports = {
    createToDo,
    updateToDo,
    deleteToDo
};