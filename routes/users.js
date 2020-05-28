var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require ('express-flash'); 
const LocalStrategy = require('passport-local').Strategy;
require('./../config/passport')(passport);
const logUser = require('.././models/').login;


    // Passport Authentications
    function checkNotAuthenticated (req, res, next){

      if (req.isAuthenticated()) {
        res.redirect('/user-profile')
      } else {
      return next()
        
      }
    }
    function checkAuthenticated (req, res, next){
    
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/login')
        
      }
    }
    

//contact 
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login page' });
});



router.post('/', function(req, res, next) {
  passport.authenticate( 'local', {
    successRedirect: '/user-profile',
    failureRedirect: '/',
    failureFlash: true
  }) (req, res, next);
});


router.post('/User',(req, res) => {
let hash = req.body.password;
bcrypt.genSalt(10, (err,salt) =>

bcrypt.hash(hash, salt,(err, hash =>{

  if (err) throw err;
  
})))

 // Store hash in your password DB.
   let userData = { 
     eamail : req.body.email,
     password : hash
       }
logUser.create({
         email: userData.email,
         password: userData.password
 
   }).then(console.log('Succesfully Registered !'))
  
})



module.exports = router;
