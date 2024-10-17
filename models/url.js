const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    shortid:{
        type: String,
        unique: true,
        required: true,
    },
    redirecturl: {
        type: String,
        required: true,
        unique: true,
    },
    visitHistory: [{
        timestamp: { type: Date, default: Date.now } // Store as Date
    }]
},
{
    timestamp: true
});
const URL = mongoose.model('url',UserSchema);

module.exports = URL;