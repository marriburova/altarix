function errorHandlerMiddleware(err, req, res, next) {
    console.log(err+': '+err.message);
    res.status(err.status || 500).json({ err: err.message });
}

module.exports = errorHandlerMiddleware;