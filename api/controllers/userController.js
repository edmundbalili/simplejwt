const bcrypt = require('bcryptjs');
const validator = require('validatorjs');
const User = require('../models/User');

const customValidator = require('../customValidator');
const jwtConfig = require('../jwtConfig')
const timestamp = Date.now();
const cryptSaltRounds = 8;

/**
 * Register user that accepts email and password
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
module.exports.register = (req, res) => {

  const data = {
    email: req.body.email,
    password: req.body.password
  };

  const rules = {
    email: 'required|email',
    password: 'required|min:8|hasLowerCase|hasUpperCase|hasNumber|hasCustomSymbolsExcept<>'
  }

  // Setup custom validation
  customValidator.rules();

  let validation = new validator(data, rules);
  let result = validation.fails();
  var status, message = '';

  if(result) {
    message = validation.errors;
    status = 400;

    return res.status(status).json({
      message: message,
      status: status,
      timestamp: timestamp
    });
  }
  else{
    let user = new User(data);
    let passwordHashed = bcrypt.hashSync(user.password, cryptSaltRounds);
    user.password = passwordHashed;

    user.save((err, user) => {

      // Detect unique key error
      if(err) {
        if(err.code === 11000){
          status = 400;
          message = 'Email already exists';
        }
        else{
          status = 500;
          message = `Unable to process request [error: ${err.code}]`;
        }
      }
      else {
        status = 200;
      }

      return res.status(status).json({
        message: message,
        status: status,
        timestamp: timestamp
      });
    });
  }
}

/**
 * Login user by checking email and password on collection
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
module.exports.login = (req, res) => {
  var status, message, token = '';

  User.findOne({email: req.body.email})
  .then((user) => {

    if(user === null){
      status = 400;
      message = 'Unable to find user';
    }
    else{

      if(bcrypt.compareSync(req.body.password, user.password)) {
        status = 200;
        message = '';
        token = jwtConfig.sign(user._id);
      }
      else{
        status = 400;
        message = 'Invalid login details';
      }

    }
    return res.json({
      message: message,
      status: status,
      timestamp: timestamp,
      token: token
    });
  })
  .catch((err) => {
    return res.json({
      message: err.message,
      status: 500,
      timestamp: timestamp,
      token: ''
    });
  });

}

/**
 * Invalidates the token and log-off the user
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
module.exports.logout = async (req, res) => {
  var token = req.body.token;
  var {status, message} = await jwtConfig.invalidate(token);

  return res.status(status).json({
    status: status,
    message: message,
    timestamp: timestamp
  });
}

/**
 * Dummy create that uses middleware token check binded on router.js
 *
 * @param {Request} req
 * @param {Response} res
 */
module.exports.create = (req, res) => {
  return res.status(200).json({
    status: 200,
    message: 'user added'
  })
}
