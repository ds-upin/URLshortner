const express = require('express');
const mainUrlRouter = require('./routes/main');
const adminRouter = require('./routes/admin');
const router = require('./routes/url');
const mongoose = require('mongoose');
const URL = require('./models/url')
const {connectMongoDb} = require('./connection');
const log_middleware = require('./middleware/urlm');

const PORT = 8001;

app = express();

connectMongoDb('mongodb://127.0.0.1:27017/urls')
.then(()=> console.log('Database Connected'))
.catch(err => console.log('Database error:',err));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(log_middleware);

app.use('/url',router);
app.use('/admin',adminRouter);

app.get('/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    if(!shortId) res.status(400).json({"msg":"Short Id missing"});
    const event = await URL.findOneAndUpdate({
        shortid:shortId
    },{
        $push:{
            visitHistory: {timestamp: Date.now()},
        }
    },{

    });
    res.redirect(event.redirecturl);
});

app.listen(PORT, ()=> console.log('Serever started at port',PORT));