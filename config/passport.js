var passport = require('passport') 
, LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('.././models/').User;


  module.exports = function(passport) {
    

      console.log('passport called');

    passport.use(
      new LocalStrategy({ 
        usernameField: 'email',
      
        }, (email, password, done) => {
        
        
        // Match user

      User.findOne({where: { email: email }})
        .then(user => {
          if (!user) {
            console.log('email not registered');
            return done(null, false, { message: 'That email is not registered' });    
          }
         
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err)  throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              //console.log('password incorrect');
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        });
      })
    );
  

 passport.serializeUser((user, done) => done(null, user.id))
 passport.deserializeUser((id, done)=> {
   //return done(null, (id))
   User.findOne({ id: id }).then(function(id) {
    return done(null, (id))
})
  
    });
     


  }
