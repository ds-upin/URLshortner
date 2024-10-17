const URL = require('../models/url');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 10 });

async function generateShortUrl(req, res)
{
    const body = req.body;
    if(!body.url) return res.status(400).json({msg: 'no url found'});
    const shortID = uid.rnd();
    URL.create({
        shortid: shortID,
        redirecturl: body.url,
        visitHistory:[],
    });
    return res.status(201).json({"Short ID":shortID});
}
async function redirectShortUrl(req,res){
    shortId= req.params.shortId;
    console.log(shortId);
    const entry = await URL.findOneAndUpdate(
        { shortid: shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }, // Correct structure
       // Return the updated document
       {new: true}
    );
    console.log(entry);
    res.status(200).redirect(entry.redirecturl);
}
module.exports = {generateShortUrl , redirectShortUrl};