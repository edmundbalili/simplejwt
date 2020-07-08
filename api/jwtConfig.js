const jwt = require('jsonwebtoken');
const BlacklistedToken = require('./models/BlacklistedToken');

const config = {
  secret:'secret', // we can also pull this from env variables
  issuer: 'SimpleJWT',
  expiration: Math.floor(Date.now() / 1000) + (60 * 60),
  subject: ''
}

/**
 * Sign token
 *
 * @param subject String
 * @returns Object JwtResponse
 */
module.exports.sign = (subject) => {
  return jwt.sign({
      iss: config.issuer,
      exp: config.expiration,
      sub: subject
    }, config.secret);
}

/**
 * Verify token if valid
 *
 * @param {string} token
 * @returns {object}
 */
module.exports.verify = (token) => {
  try {
    var status, message = '';
    var decoded = jwt.verify(token, config.secret, { iss: config.issuer });

    return {
      status: 200,
      message: ''
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message
    }
  }
}

/**
 * Invalidate token by storing it on blacklisted collection on db
 * (
 *  could be done on Redis as well for faster transaction, or using in-memory database like lokijs
 *  but for testing purpose lets use DB as basic implementation
 * )
 * Comprehends with jwtController on how they tie up together
 *
 * @param {string} token
 * @returns {Promise}
 */
module.exports.invalidate = async (token) => {
  var blacklistedToken = new BlacklistedToken({
    token: token
  });

  return blacklistedToken.save()
    .then((result) => {
      return {
        status: 200,
        message: ''
      }
    })
    .catch((error) => {
      return {
        status: 500,
        message: error.message
      }
    });
}

module.exports.config = config;
