const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { db } = require('./config');
const showToDo = require('./routes/index');
const { signUp, logIn, logOut } = require('./routes/users');
const { createToDo, updateToDo, deleteToDo } = require('./routes/todo');
const authenticationMiddleware = require('./middlewares/authenticationMiddleware');
const errorHandler = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '10kb'}));
app.use(cookieParser());
app.use(errorHandler);

mongoose.connect(db, { useNewUrlParser: true }, (err) => {
    if (err) errorHandler(err);
    console.log('Successfully connected to database');
});

//Routes
app.get('/', authenticationMiddleware(), async (req, res) => {
    await showToDo(req, res);
});
app.get('/login', async (req,res) => {
    res.send('Log In or Sign Up!');
});
app.post('/login', async (req,res) => {
    if(!req.body) return await res.sendStatus(400);
    await logIn(req, res);
});
app.post('/signup', async (req, res) => {
    if(!req.body) return await res.sendStatus(400);
    await signUp(req, res);
});
app.post('/createToDo', authenticationMiddleware(), async (req, res) => {
    if(!req.body) return await res.sendStatus(400);
    await createToDo(req, res);
});
app.post('/updateToDo', authenticationMiddleware(), async (req, res) => {
    if(!req.body) return await res.sendStatus(400);
    await updateToDo(req, res);
});
app.post('/deleteToDo', authenticationMiddleware(), async (req, res) => {
    if(!req.body) return await res.sendStatus(400);
    await deleteToDo(req, res);
});
app.get('/logout', authenticationMiddleware(), async (req,res) => {
    if(!req.body) return await res.sendStatus(400);
    await logOut(req, res);
});

app.listen(3000, () => { console.log('Listening 3000 port...'); });

