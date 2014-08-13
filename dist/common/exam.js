/*!
 * exam.js
 * 
 * Copyright (c) 2014
 */

var _ = require('customs/utils');
var checks = require('customs/checks');


// ----------------------------------------------------------------------------
// Exam
// ----------------------------------------------------------------------------

/**
 * Class to run validation checks and return
 * formatted results.
 *
 * @example
 * var exam = new Exam(data, rules);
 *
 * @public
 * @constructor
 *
 * @param {object} data - data to validate
 * @param {object} rules - rules object to validate data against.
 */
var Exam = function () {
  // Default values
  this.isValid = true;
  this.errors = {};
};


/**
 * Run validation suite.
 *
 * @example
 * exam.run();
 *
 * @public
 *
 * @param {object} data - data to validate
 * @param {object} rules - rules object to validate data against.
 */
Exam.prototype.run = function (data, rules) {
  for (var name in data) {
    if (!rules[name]) { continue; }
    this.checkRules(name, data[name], rules[name]);
  }
};


/**
 * Check value against all rules defined for that value.
 *
 * @private
 *
 * @param {string} name - name of property we are validating.
 * @param {value} value - value of named property.
 * @param {array} rules - array of rules applied to specified name.
 */
Exam.prototype.checkRules = function (name, value, rules) {
  var errors = [];
  var isEmpty = value === '';
  var hasRules = rules[0];

  // If first rule is not required
  // and we have an empty value - continue
  if (isEmpty && hasRules && rules[0].name !== 'required') {
    return true;
  }

  // Check each rule
  for (var rule in rules) {
    var error = this.checkRule(name, value, rules[rule]);
    if (error) {
      errors.push(error);
    }
  }

  // Add any errors we find
  if (errors.length) {
    this.errors[name] = errors;
  }
};


/**
 * Validate an individual rule.
 *
 * @private
 *
 * @param {string} name - name of property we are validating.
 * @param {value} value - value of named property.
 * @param {object} rule - rule object to validate.
 * @reutns {str|null} - string with error message or null if
 *   no error.
 */
Exam.prototype.checkRule = function (name, value, rule) {
  // If no check exists, throw err
  if (!checks[rule.name]) {
    throw new Error('There is no check defined by the name: ' + rule.name);
  }

  return !checks[rule.name].check(value, rule.args)
    ? this.formatError(name, rule)
    : null;
};


/**
 * Format error message.
 *
 * @private
 *
 * @param {string} name - name of property we are validating.
 * @param {object} rule - rule object to validate.
 * @reutns {object} - object containg the rule name and error string.
 */
Exam.prototype.formatError = function (name, rule) {
  // We have an error :(
  this.isValid = false;

  var msg = checks[rule.name].msg;
  var data = [name];

  // Add any additional data for templating error msg
  if (rule.args) {
    data = data.concat([rule.args]);
  }

  return {
    name: rule.name,
    msg: _.tmpl(msg, data)
  };
};


// ----------------------------------------------------------------------------
// expose
// ----------------------------------------------------------------------------

module.exports = Exam;


