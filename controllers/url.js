const URL = require('../models/url');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 10 });
const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, '../log.txt');


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

async function handleAdmin(req,res){
    if(!req.body|| !req.body.userid || !req.body.password1 || !req.body.password2) return res.status(400).json({"msg":"Not sufficient data"});
    const user = req.body.userid;
    const ps1 = req.body.password1;
    const ps2 = req.body.password2;
    if(ps1==='WeRdqwT532g689' && ps2==='GRRR#$5tr4rt8jHY66tf' && user==='2327TI1035')
    {
        const db_data = await URL.find({});
        const log_data = fs.readFileSync(filepath, 'utf8');
        res.status(200).json({"data": db_data, "log":log_data })
    }
    else{
        res.status(400).json({"msg":"Invalid credential!"});
    }
}

module.exports = {generateShortUrl , redirectShortUrl, handleAdmin};