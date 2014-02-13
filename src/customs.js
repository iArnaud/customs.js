/*!
 * customs.js
 * 
 * Copyright (c) 2014
 */

define([
  'checks',
  'utils'
], function (checks, utils) {


// ----------------------------------------------------------------------------
// Customs
// ----------------------------------------------------------------------------
return {
  // Expose checks - because its the nice thing to do
  checks: checks,

  //
  //
  //
  check: function (data, rules) {
    var result = { isValid: false, errs: {} };

    // Loop over each data key
    for (var key in data) {
      if (rules && rules[key]) {
        var keyErrs = this._checkKey(key, data[key], rules[key]);
        if (keyErrs.length) { result.errs[key] = keyErrs; }
      }
    }

    // If no errs remove prop from results
    if (utils.isEmpty(result.errs)) {
      result.isValid = true;
      delete result.errs;
    }

    // Return results of check
    return result;
  },

  //
  //
  //
  _checkKey: function (name, val, rule) {
    var ruleChecks = rule.split('|'),
        errs       = [];

    // If is empty and not required
    if (rule.indexOf('required') == -1 && val === '') { return true; }

    // Run each check
    for (var i = 0, l = ruleChecks.length; i < l; i++) {
      var ruleCheck = this._getRuleCheckParts(ruleChecks[i]),
          result    = this._checkRule(val, ruleCheck.rule, ruleCheck.args);

      if (!result) {
        // Add rules to args for formatting
        var formatArgs = [name];
        if (typeof ruleCheck.args !== 'undefined') { formatArgs = formatArgs.concat(ruleCheck.args); }

        // Create formatted message
        var msg = utils.formatStr(checks[ruleCheck.rule].msg, formatArgs);

        // Push to errs
        errs.push({ rule: ruleCheck.rule, msg: msg});
      }
    }

    return errs;
  },

  //
  //
  //
  _checkRule: function (val, rule, args) {
    // If no check exists, throw err
    if (!checks[rule]) {
      throw new Error('There is no check defined by the name: ' + rule);
    }

    // If result of check
    return args
      ? checks[rule].check.apply(checks, [val, args])
      : checks[rule].check.apply(checks, [val]);
  },

  //
  //
  //
  _getRuleCheckParts: function (ruleCheck) {
    var parts = /^(.+?)\[(.+)\]$/.exec(ruleCheck);

    return (parts)
      ? { rule: parts[1], args: parts[2] }
      : { rule: ruleCheck };
  }
};


});