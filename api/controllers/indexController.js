const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    res.send('API is working properly');
});