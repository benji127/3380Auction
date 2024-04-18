const path = require('path');

function notFoundMiddleware(req, res) {
    res.status(404).sendFile(path.join(__dirname, '../../', '404.html'));
}

module.exports = notFoundMiddleware;