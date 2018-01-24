const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//init express app
const app = express();

//Setup ejs template engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//Serving static files
app.use('/public', express.static('public'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Connecting to mongodb
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/techsperience-oek';
const objectId = require('mongodb').ObjectId; //params

MongoClient.connect(mongoURL, function(err, db){
if (err) {
  console.log(err);
}else{
  console.log("Connected Successfully")
}

oek = db.collection('oek');
});

//Routes

//Intro 1.
app.get('/', function(req, res) {
  oek.find({}).toArray(function(err,docs){
    if(err){
      console.log(err);
    }
    res.render('index', {docs: docs});
  });
});

//Add 2.
app.post('/oek/add', function(req, res){
  oek.insert({company_name: req.body.company_name, municipality: req.body.municipality, password: req.body.password, business_registration_nr: req.body.business_registration_nr, company_address: req.body.company_address, email_address: req.body.email_address, website: req.body.website, business_description: req.body.business_description}, function(err, result){
   if(err){
      console.log(err);
    }
    res.redirect('/');
  });
});



//Show 3.
//Runs on index

//Edit 4.
app.get('/oek/edit/:id', function(req, res) {
  var id = objectId(req.params.id);
  oek.findOne({_id: id}, function(err, doc){
    if(err){
      console.log(err);
    }
    res.render('edit', {doc: doc})
  });
});

//Update 5
app.post('/oek/update/:id', function(req, res) {
  var id = objectId(req.params.id);
  oek.updateOne({_id: id}, {$set:{company_name: req.body.company_name, municipality: req.body.municipality, password: req.body.password, business_registration_nr: req.body.business_registration_nr, company_address: req.body.company_address, email_address: req.body.email_address, website: req.body.website, business_description: req.body.business_description}}, function(err, result){
   if(err){
      console.log(err);
    }
    res.redirect('/')
  });
});

//Delete 6.
app.get('/oek/delete/:id', function(req, res) {
  var id= objectId(req.params.id);
  oek.deleteOne({_id:id}, function(err, result){
    if(err){
      console.log(err);
    }
      res.redirect('/');
  });
});

//Runn app!
app.listen(3000, () => {
  console.log("App running at http://localhost:3000");
});
