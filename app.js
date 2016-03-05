var methodOverride   = require('method-override');
var bodyParser       = require('body-parser');
var mongoose         = require('mongoose');
var express          = require('express');
var app              = express();

// mongoose.connect('mongodb://localhost/phones_data');
mongoose.connect('mongodb://retsbud:String33@ds047612.mlab.com:47612/phoneratings');

// mongodb://retsbud:String33@ds047612.mlab.com:47612/phoneratings
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var phoneSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Phones = mongoose.model('Phones', phoneSchema);

// Phones.create(
//   {
//     name: "iPhone",
//     image: "http://cdn2.macworld.co.uk/cmsdata/features/3530504/iphone-7-design-with-ios-10.jpg",
//     description: "Best Apple phone to date."
//   }, function(err, phone) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("New Phone Made");
//       console.log(phone);
//     }
//   });


app.get('/', function(req, res) {
  res.redirect('/phones');
});

app.get('/phones', function(req, res) {
  Phones.find({}, function(err, allPhones) {
    if(err) {
      console.log(err);
    } else {
      res.render('home', {phones: allPhones});
    }
  });
});

app.get('/phones/new', function(req, res) {
  res.render('new');
});

app.get('/phones/:id', function(req, res) {
  Phones.findById(req.params.id, function(err, onePhone) {
    if(err) {
      console.log(err);
    } else {
      res.render('show', {phone: onePhone});
    }
  });
});


// app.delete('/blogs/:id', function(req, res) {
//   Blog.findByIdAndRemove(req.params.id, req.body.blog, function(err) {
//   if(err) {
//     res.redirect('/blogs');
//   } else {
//     res.redirect('/blogs');
//   }
//   });
// });

app.post('/phones', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;

  var newPhone = {name: name, image: image, description: desc}
  Phones.create(newPhone, function(err, addPhone) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/phones');
    }
  });
});

app.delete('/phones/:id', function(req, res) {
  Phones.findByIdAndRemove(req.params.id, req.body.phone, function(err, deleted) {
    if(err) {
      console.log(err);
      res.redirect('/phones');
    } else {
      console.log(deleted);
      console.log("Phone Deleted");
      res.redirect('/phones');
    }
  });
});


app.listen(process.env.PORT, process.env.IP, function() {
 console.log("Server has started..");
});
