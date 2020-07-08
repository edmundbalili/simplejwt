const validator = require('validatorjs');

/**
 * Setup custom rules for validation
 */
module.exports.rules = _ => {

  // Must contain at least 1 lower case
  validator.register('hasLowerCase', function(value, requirement, attribute) {
    return value.match(/[a-z]/);
  }, 'Must contain at least 1 lower case letter');

  // Must contain at least 1 upper case
  validator.register('hasUpperCase', function(value, requirement, attribute) {
    return value.match(/[A-Z]/);
  }, 'Must contain at least 1 upper case letter');

  // Must contain at least 1 digit/number
  validator.register('hasNumber', function(value, requirement, attribute) {
    return value.match(/[0-9]/);
  }, 'Must contain at least 1 digit');

  // Must contain at least 1 special character except < and >
  validator.register('hasCustomSymbolsExcept<>', function(value, requirement, attribute) {
    return value.match(/[@$!%*#?&\[\]\\\/|{}:;()_.=^~+-]/);
  }, `Must contain at least 1 special character (except '>' and '>')`);
}
