var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
//var passport = require('passport');

var connection = require('../config/connection');  //path 1
// page 1 load krddi database eke tiyen data table 1t load krnna require krnw 

/*Database connection 1 hadanne / okkom request enw /data fetch krnw,
view eken data pass karnaw,table eke data pennanw
/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM users',function (err,rows) { 
    //database eke data tiyenwm ewa adal gannw  -- parameter(err & row)
    if (err) throw err;
    res.render('index', { users:rows });
    //rows tika return krnw users kiyan name 1n, bind krnw{users,rows}
    //object 1k vidihat rap karnw ,index.hbs 1th ywnaw
  });
   
});
// index.hbs eken 
router.post('/addUser',function (req,res) {
 
  const userdata = {

    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    pass1:req.body.pass1
   

  }

  /*var errors = [];

  if(req.body.pass1!= req.body.pass2){
    errors.push({text:'Password do not match'});
  }

  if(req.body.pass1.length < 4){
    errors.push({text:'Password must be at least 4 characters'});
  }

  if(errors.length > 0){*/

  connection.query("INSERT INTO users SET ?", userdata,function (err,result) {
    if(err) throw err;
    res.redirect('/table')
  });/*
}
  bcrypt.genSalt(10, function(err,salt){
    bcrypt.hash(userdata.pass1,salt, function(err,hash){
      if(err) throw err;
      userdata.pass1 = hash;
      userdata.save()
      .then( user => {
        req.flash('succes_msg','You are now registered and can log in');
      });
    });
    

  });*/

});

router.get('/table', function(req, res, next) {

  connection.query('SELECT * FROM users',function (err,rows) { 
    if (err) throw err;
    res.render('table', { users:rows });
  });

});

router.get('/deleteUser/:id', function (req,res) {
  
  var userid = req.params.id;
  connection.query("DELETE FROM users WHERE id = ?",[userid],function (err,rows) {
    if(err) throw err;
    res.redirect('/table')

  });

});

router.get('/edit/:id',function (req,res) {

  var userid = req.params.id;
  connection.query("SELECT * FROM users WHERE id = ?",[userid],function (err,rows) {
    if(err) throw err;
    res.render('edit', {userdata:rows}); 

  });
 
});

router.post('/updateUser/:id',function (req,res) {

  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var pass1 = req.body.pass1;
 // var pass2 = req.body.pass2;

  var updateId = req.params.id;
  connection.query("UPDATE users SET fname=?,lname=?,email=?,pass1=? WHERE id=?",[fname,lname,email,pass1,updateId],function (err,respond) {
    if (err) throw err;
    res.redirect('../table')
  });

});

//user login route

router.get('/login' ,function(req,res) {
  res.render('login')
});

router.get('/abc' ,function(req,res) {
  res.render('index')
});

//web page route

router.get('/home' ,function(req,res) {
  res.render('home')
});/*

router.get('/abc' ,function(req,res) {
  res.render('index')
});*/










module.exports = router;