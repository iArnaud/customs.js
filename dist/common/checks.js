/*!
 * checks.js
 * 
 * Copyright (c) 2014
 */

var _ = require('customs/utils');


// ----------------------------------------------------------------------------
// Regular Expressions
// ----------------------------------------------------------------------------

var regExs = {
  numeric: /^[0-9]+$/,
  integer: /^\-?[0-9]+$/,
  decimal: /^\-?[0-9]*\.?[0-9]+$/,
  email: /^[a-zA-Z0-9.!#$%&amp;'*+\-\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/,
  alpha: /^[a-z]+$/i,
  alphaNumeric: /^[a-z0-9]+$/i,
  alphaDash: /^[a-z0-9_\-]+$/i,
  natural: /^[0-9]+$/i,
  naturalNoZero: /^[1-9][0-9]*$/i,
  ip: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
  base64: /[^a-zA-Z0-9\/\+=]/i,
  numericDash: /^[\d\-\s]+$/,
  url: /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
};


// ----------------------------------------------------------------------------
// Rules
// ----------------------------------------------------------------------------

var checks = {};

//
// required
// returns false if the value is empty.
//
checks['required'] = {
  msg: 'The {0} field is required.',
  check: function (val) {
    return (val !== null && typeof val === 'object')
      ? _.isEmpty(val)
      : (val !== null && val !== '');
  }
};

//
// default[value]
// returns false if the value is equal to the specified value
//
checks['default'] = {
  'msg': 'The {0} field is still set to default, please change.',
  'check': function (val, name) {
    return val !== name;
  }
};

//
// email
// returns false if the value is not a valid email address.
//
checks['email'] = {
  'msg': 'The {0} field must contain a valid email address.',
  'check': function (val) {
    return regExs['email'].test(val);
  }
};

//
// emails
// returns false if any value provided in a comma separated list is not
// a valid email.
//
checks['emails'] = {
  'msg': 'The {0} field must contain all valid email addresses.',
  'check': function (val) {
    // Split emails
    var result = val.split(',');
    // Loop over and check each individual email
    for (var i = 0; i < result.length; i++) {
      var stripped = String(result[i]).replace(/^\s+|\s+$/g, '');
      if (!regExs['email'].test(stripped)) { return false; }
    }
    return true;
  }
};

//
// minLength[length]
// returns false if the value is shorter than the parameter.
//
checks['minLength'] = {
  'msg': 'The {0} field must be at least {1} characters in length.',
  'check': function (val, length) {
    return (!regExs['numeric'].test(length))
      ? false
      : val.length >= parseInt(length, 10);
  }
};

//
// maxLength[length]
// returns false if the value is longer than the parameter.
//
checks['maxLength'] = {
  'msg': 'The {0} field must not exceed {1} characters in length.',
  'check': function (val, length) {
    return (!regExs['numeric'].test(length))
      ? false
      : val.length <= parseInt(length, 10);
  }
};

//
// exactLength[length]
// returns false if the value length is not exactly the parameter.
//
checks['exactLength'] = {
  'msg': 'The {0} field must be exactly {1} characters in length.',
  'check': function (val, length) {
    return (!regExs['numeric'].test(length))
      ? false
      : val.length === parseInt(length, 10);
  }
};

//
// greaterThan[param]
// returns false if the value is less than the parameter
// after using parseFloat.
//
checks['greaterThan'] = {
  'msg': 'The {0} field must contain a number greater than {1}.',
  'check': function (val, param) {
    return (!regExs['decimal'].test(val))
      ? false
      : parseFloat(val) > parseFloat(param);
  }
};

//
// lessThan[param]
// returns false if the value is greater than the parameter
// after using parseFloat.
//
checks['lessThan'] = {
  'msg': 'The {0} field must contain a number less than {1}.',
  'check': function (val, param) {
    return (!regExs['decimal'].test(val))
      ? false
      : parseFloat(val) < parseFloat(param);
  }
};

//
// alpha
// returns false if the value contains anything other than
// alphabetical characters.
//
checks['alpha'] = {
  'msg': 'The {0} field must only contain alphabetical characters.',
  'check': function (val) {
    return regExs['alpha'].test(val);
  }
};

//
// alphaNumeric
// returns false if the value contains anything other than
// alpha-numeric characters.
//
checks['alphaNumeric'] = {
  'msg': 'The {0} field must only contain alpha-numeric characters.',
  'check': function (val) {
    return regExs['alphaNumeric'].test(val);
  }
};

//
// alphaDash
// returns false if the value contains anything other than
// alphanumeric characters, underscores, or dashes.
//
checks['alphaDash'] = {
  'msg': 'The {0} field must only contain alpha-numeric characters, underscores, and dashes.',
  'check': function (val) {
    return regExs['alphaDash'].test(val);
  }
};

//
// numeric
// returns false if the value contains anything other than
// numeric characters.
//
checks['numeric'] = {
  'msg': 'The {0} field must contain only numbers.',
  'check': function (val) {
    return regExs['numeric'].test(val);
  }
};

//
// integer
// returns false if the value contains anything other than an integer.
//
checks['integer'] = {
  'msg': 'The {0} field must contain an integer.',
  'check': function (val) {
    return regExs['integer'].test(val);
  }
};

//
// decimal
// returns false if the value contains anything other than a decimal.
//
checks['decimal'] = {
  'msg': 'The {0} field must contain a decimal number.',
  'check': function (val) {
    return regExs['decimal'].test(val);
  }
};

//
// natural
// returns false if the value contains anything other than a
// natural number: 0, 1, 2, 3, etc.
//
checks['natural'] = {
  'msg': 'The {0} field must contain only positive numbers.',
  'check': function (val) {
    return regExs['natural'].test(val);
  }
};

//
// naturalNoZero
// returns false if the value contains anything other than a
// natural number, but not zero: 1, 2, 3, etc.
//
checks['naturalNoZero'] = {
  'msg': 'The {0} field must contain a number greater than zero.',
  'check': function (val) {
    return regExs['naturalNoZero'].test(val);
  }
};

//
// url
// returns false if the supplied string is not a valid url
//
checks['url'] = {
  'msg': 'The {0} field must contain a valid URL.',
  'check': function (val) {
    return (regExs['url'].test(val));
  }
};

//
// creditCard
// returns false if the supplied string is not a valid credit card
//
checks['creditCard'] = {
  'msg': 'The {0} field must contain a valid credit card number.',
  'check': function (val) {
    // accept only digits, dashes or spaces
    if (!regExs['numericDash'].test(val)) { return false; }

    var str = val.replace(/[ -]+/g,''),
        len = str.length,
        mul = 0,
        sum = 0,
        prodArr = [
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
        ];

    while (len--) {
      sum += prodArr[mul][parseInt(str.charAt(len), 10)];
      mul ^= 1;
    }

    return (sum % 10 === 0 && sum > 0);
  }
};

//
// fileType
// returns false if the supplied file is not part of the comma
// separated list in the paramter
//
checks['fileType'] = {
  'msg': 'The {0} field must contain only {1} files.',
  'check': function (val, type) {
    // Get ext of val
    var ext = val.substr((val.lastIndexOf('.') + 1));
    // Get accepted types
    var types = type.split(',');
    // Loop over all types and check if ext matches
    for (var i = 0; i < types.length; i++) {
      var stripped = String(types[i]).replace(/^\s+|\s+$/g, '');
      if (ext === stripped) { return true; }
    }
    return false;
  }
};

// ----------------------------------------------------------------------------
// Expose
// ----------------------------------------------------------------------------

module.exports = checks;


