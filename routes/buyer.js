var express = require('express');
//var bodyParser = require('body-parser');
var router = express.Router();
var hbs = require('hbs');
var _ = require('lodash');
//const sendMail = require('./send-email2');
var {Requirement} = require('./../models/requirement');
const {ObjectID} = require('mongodb');

//var {Supplier} = require('./../server/models/supplier');


//var {Requirement} = require('./../server/db/mongoose');
//var {Requirement} = require('./../server/db/requirement1.js');
//app.use(bodyParser.json());
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

/* GET users listing. */


router.get('/', function(req, res, next) {
   // res.render('home', { title: 'Home Page', currentYear: new Date().getFullYear(), welcomeMessage: 'Welcome to Buyer Page' });
   res.render('home', { title: 'Home Page',currentYear: new Date().getFullYear(), welcomeMessage: 'Welcome to Buyer Page' });
});

router.post('/Add',(req,res)=>{
   // console.log(req.body);
   var newRequirement = new Requirement({
    requirementName:req.body.RequirementName,
    description:req.body.Description,
    supplierCategory:req.body.SupplierCategory,
    closingDate:req.body.ClosingDate}) 
 
    newRequirement.save().then((doc)=>{
        console.log(doc);
        res.send(doc);
    }).catch((e)=>{
        res.status(200).send(e);
    })

})

  // Get for All requirements
    router.get('/List', (req, res) => {
    Requirement.find().then((requirement) => {
      res.send({requirement});
    }, (e) => {
      res.status(400).send(e);
    });
  });

  
  router.get('/Requirements/:id', (req, res) => {
    var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Requirement.findById(id).then((requirement) => {
    if (!requirement) {
      return res.status(404).send();
    }

    res.send({requirement});
  }).catch((e) => {
    res.status(400).send();
  });
});

//Delete Requirement

router.delete('/Requirements/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Requirement.findByIdAndRemove(id).then((requirement) => {
    if (!requirement) {
      return res.status(404).send();
    }

    res.send({requirement});
  }).catch((e) => {
    res.status(400).send();
  });
});


// Edit Requirement
router.patch('/Requirements/:id', (req, res) => {
  var id = req.params.id;
  //var body = _.pick(req.body, ['requirementName', 'description','supplierCategory','closingDate']);
  var body = _.pick(req.body, ['requirementName', 'description','supplierCategory']);

  var date = req.body.closingDate;
  //var date = data[0].date;
  //var dateObject = new Date(date);
  //date[0].date = dateObject

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Requirement.findByIdAndUpdate(id, {$set: body}, {new: true}).then((requirement) => {
    if (!requirement) {
      return res.status(404).send();
    }

    res.send({requirement});
  }).catch((e) => {
    res.status(400).send();
  })
});




// GET New requirement page. 
router.get('/newreq', function(req, res) {
    res.render('requirement-create', { title: 'Add New Requirement',currentYear: new Date().getFullYear() });
  });

/* Added comment on 10th July 2018
// GET New requirement page. 
router.get('/newreq', function(req, res) {
    res.render('newrequirement', { title: 'Add New Requirement' });
  });


        

router.post('/addreq', function(req, res) {

    // Set our internal DB variable
    //var db = req.db;
  //res.send('hit');
    // Get our form values. These rely on the "name" attributes
    var materialspec = req.body.materialspec;
    var quality = req.body.quality;
    var quantity = req.body.quantity;
  
    var require = new Requirement({
        materialspec:materialspec,
        quantity:quantity,
        quality:quality
     });

      Supplier.find().then((docs)=>{
          console.log(JSON.stringify(docs,undefined,2));
      });
       
     require.save().then((doc)=>{
        // console.log(doc);
       
         var allsuppliers ;

          Supplier.find()        
         .select( {'email':1,'_id':0 } )
         .exec(function(err, docs){
             docs = docs.map(function(doc) { return doc.email; });
             if(err){
               return console.log(err);
             } else {
               allsuppliers =docs.concat().toString();
               console.log(allsuppliers);
               sendMail(allsuppliers,'Adding Requirements',doc.materialspec);    
             };
            });

            

        //sendMail(allsuppliers,'Adding Requirements',doc.materialspec);
        // res.send(doc);
         res.redirect("requirementlist");
        
        },(e)=>{
         console.log(e);
     });
    });
 

  router.get('/requirementlist', function(req, res) {
  
    Requirement.find().then((docs) => {
       // console.log(JSON.stringify(docs, undefined, 2));
        res.render('requirementlist', {
          "requirementlist" : docs 
     // });
        });
   
    });
        //console.log(JSON.stringify(docs, undefined, 2));
      });
  
     
 */ 
       
  
   

module.exports = router;