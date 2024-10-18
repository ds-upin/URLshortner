const express = require('express');
const mainUrlRouter = express.Router();
const {generateShortUrl,redirectShortUrl, handleAdmin} = require('../controllers/url');

mainUrlRouter.get('/',redirectShortUrl);
module.exports = mainUrlRouter;