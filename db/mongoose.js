const mongoose= require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodaApp');
//mongoose.connect(process.env.MONGODB_URI);


//var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;

//mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost:27017/BuyerApp');

module.exports={mongoose}