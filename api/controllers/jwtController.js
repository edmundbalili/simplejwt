const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig')
const blacklistedToken = require('../models/BlacklistedToken');

/**
 * Check token first if blacklisted on db, else proceed on token verifying
 *
 * @param {Request} res
 * @param {Response} res
 * @returns {Response}
 */
module.exports.verify = (req, res) => {
  var token = req.body.token;

  blacklistedToken.findOne({token: token}, (err, result) => {
    var status, message = '';

    if (err) {
      status = 500;
      message = err.message;
    }
    else{
      if (result === null) {
        var {status, message} = jwtConfig.verify(token);
      }
      else{
        status = 400;
        message = "token already invalidated";
      }
    }

    return res.status(status).json({
      message: message,
      status: status,
      timestamp: Date.now()
    })
  });
}

/**
 * Perform token check for any transaction binded on router.js
 * Simple implemenation using bearer method
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 */
module.exports.isAuth = function (req, res, next) {
  var token = req.headers.authorization;
  var status, message = '';

  token = token.replace(/^Bearer\s/, '');

  if (token) {
    var {status, message} = jwtConfig.verify(token);
    if(status == 200) {
      next();
    }
  }
  else{
    status = 401;
    message = 'Unathorized';
  }

  return res.status(status).json({
    message: message,
    status: status,
    timestamp: Date.now()
  });
}
