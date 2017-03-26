//require the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

//set up model for our users collection
var userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  } 
});

//store the hash password before each save
userSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//for comparing the password stored in db and the input pass.
userSchema.methods.comparePassword = function (passwrd, hash, cb) {
  bcrypt.compare(passwrd, hash, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
}



module.exports = mongoose.model('User', userSchema);