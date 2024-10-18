const express = require('express');
const router = express.Router();
const {generateShortUrl, redirectShortUrl, handleAdmin} = require('../controllers/url');

router.post('/',generateShortUrl);
module.exports = router;