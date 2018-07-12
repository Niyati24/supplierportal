const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var buyerRouter = require('./routes/buyer');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials');

app.use((req,res,next)=>{
  var log =`${new Date().toString()},${req.method},${req.url}`;
//console.log()
fs.appendFile('server.log',log +'/n', (err)=>{
    if(err){
        console.log('unable to append');
    }
}
)
next();
})
app.use(express.static(__dirname+'/public'));
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/BuyerPortal', buyerRouter);

app.get('/',(req,res)=>{
    res.send('Hello Express');
})

var port = 3000;
app.listen(port,()=>{
    console.log(`Running on port ${port}`);
})