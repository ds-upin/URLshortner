const express = require('express');
const router = express.Router();
const {generateShortUrl, redirectShortUrl} = require('../controllers/url');

router.post('/',generateShortUrl);
module.exports = router;