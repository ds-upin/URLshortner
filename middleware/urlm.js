const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '../log.txt'); 

async function log_middleware(req, res, next) {
    const now = new Date();
    const logEntry = `\nIP: ${req.ip}      ---TIMESTAMP: ${now.toISOString()}      ---METHOD: ${req.method}      ---URL: ${req.url}`;

    try {
        await fs.promises.appendFile(filepath, logEntry);
        next();
    } catch (err) {
        console.error('Error writing to log file:', err);
        res.status(400).end();
    }
}

module.exports = log_middleware;