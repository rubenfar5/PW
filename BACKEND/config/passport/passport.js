var bCrypt = require('bcrypt-nodejs');
const jsonMessagesPath = __dirname + "/../../assets/";
var jsonMessages = require(jsonMessagesPath + "login");

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      }
      else {
        done(user.errors, null);
      }
    });
  });

  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
      var User = user;
      var isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass);
      }
      User.findOne({ where: { username: username } }).then(function(user) {
        if (!user) {
          return done(null, false, jsonMessages.user.username);
        }
        if(user.id_cargo != 3) {
            return done(null, false, jsonMessages.user.username);
        }
        if (!isValidPassword(user.password, password)) { 
          return done(null, false, jsonMessages.user.password);
        }
        var userinfo = user.get();
        return done(null, userinfo);
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false,  jsonMessages.user.error);
      });
    }
  ));
}
