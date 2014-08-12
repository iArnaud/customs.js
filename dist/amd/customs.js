/*!
 * customs.js
 * 
 * Copyright (c) 2014
 */

define([
  'customs/exam'
], function (Exam) {


// ----------------------------------------------------------------------------
// Customs
// ----------------------------------------------------------------------------

/**
 * Interface for valiating data against a set
 * of rules.
 *
 * @example
 * var validator = new Customs(rules);
 *
 * @public
 * @constructor
 *
 * @param {object} definitions - key, value pair where the name refers to
 *   the item id and the value is a string representation of validation
 *   requirements.
 */
var Customs = function (definitions) {
  // Build and parse definitions
  this.rules = this.build(definitions);
};


/**
 * Method to take a user formatted rules object and return
 * a customs formatted rules object. Breaks apart strings
 * and returns and array of rule objects.
 *
 * @private
 *
 * @param {object} definitions - user defined rules object (aka
 *   rule definitions).
 * @returns {object} - formatted rules object.
 */
Customs.prototype.build = function (definitions) {
  var formatted = {};

  for (var name in definitions) {
    formatted[name] = this.buildRules(definitions[name]);
  }

  return formatted;
};


/**
 * Create array of rules from pipe seperated string.
 *
 * @private
 *
 * @param {string} str - user defined string of rules. Each rule is
 *   seperated by a "|".
 * @returns {array} - array of rule objects.
 */
Customs.prototype.buildRules = function (str) {
  var parts = str.split('|');
  var rules = [];

  for (var i = 0, l = parts.length; i < l; i++) {
    rules.push(this.parseRule(parts[i]));
  }

  return rules;
};


/**
 * Parse string to grab optional arguments specified
 *   by nesting in brackets (ex: [argument]).
 *
 * @private
 *
 * @param {string} str - rule string.
 * @returns {object} - rule object (name and args properties).
 */
Customs.prototype.parseRule = function (str) {
  var parts = /^(.+?)\[(.+)\]$/.exec(str);

  return (parts)
    ? { name: parts[1], args: parts[2] }
    : { name: str };
};


/**
 * Run exam and return result object
 *
 * @private
 *
 * @param {object} data - data to validate.
 * @returns {object} - result (isValid and erors properties).
 */
Customs.prototype.check = function (data) {
  var exam = new Exam();
  exam.run(data, this.rules || {});
  
  return {
    isValid: exam.isValid,
    errors: exam.errors
  };
};


// ----------------------------------------------------------------------------
// expose
// ----------------------------------------------------------------------------

return Customs;


});