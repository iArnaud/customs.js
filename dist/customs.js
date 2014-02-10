;(function (name, context, definition) {
  if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
  else if (typeof define === 'function' && define.amd) { define(definition); }
  else { context[name] = definition(); }
})('customs', this, function () {
var checks = function () {
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
        var checks = {};
        checks['required'] = {
            'msg': 'The %s field is required.',
            'check': function (val) {
                return val !== null && val !== '';
            }
        };
        checks['default'] = {
            'msg': 'The %s field is still set to default, please change.',
            'check': function (val, name) {
                return val !== name;
            }
        };
        checks['email'] = {
            'msg': 'The %s field must contain a valid email address.',
            'check': function (val) {
                return regExs['email'].test(val);
            }
        };
        checks['emails'] = {
            'msg': 'The %s field must contain all valid email addresses.',
            'check': function (val) {
                var result = val.split(',');
                for (var i = 0; i < result.length; i++) {
                    var stripped = String(result[i]).replace(/^\s+|\s+$/g, '');
                    if (!regExs['email'].test(stripped)) {
                        return false;
                    }
                }
                return true;
            }
        };
        checks['minLength'] = {
            'msg': 'The %s field must be at least %s characters in length.',
            'check': function (val, length) {
                return !regExs['numeric'].test(length) ? false : val.length >= parseInt(length, 10);
            }
        };
        checks['maxLength'] = {
            'msg': 'The %s field must not exceed %s characters in length.',
            'check': function (val, length) {
                return !regExs['numeric'].test(length) ? false : val.length <= parseInt(length, 10);
            }
        };
        checks['exactLength'] = {
            'msg': 'The %s field must be exactly %s characters in length.',
            'check': function (val, length) {
                return !regExs['numeric'].test(length) ? false : val.length === parseInt(length, 10);
            }
        };
        checks['greaterThan'] = {
            'msg': 'The %s field must contain a number greater than %s.',
            'check': function (val, param) {
                return !regExs['decimal'].test(val) ? false : parseFloat(val) > parseFloat(param);
            }
        };
        checks['lessThan'] = {
            'msg': 'The %s field must contain a number less than %s.',
            'check': function (val, param) {
                return !regExs['decimal'].test(val) ? false : parseFloat(val) < parseFloat(param);
            }
        };
        checks['alpha'] = {
            'msg': 'The %s field must only contain alphabetical characters.',
            'check': function (val) {
                return regExs['alpha'].test(val);
            }
        };
        checks['alphaNumeric'] = {
            'msg': 'The %s field must only contain alpha-numeric characters.',
            'check': function (val) {
                return regExs['alphaNumeric'].test(val);
            }
        };
        checks['alphaDash'] = {
            'msg': 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
            'check': function (val) {
                return regExs['alphaDash'].test(val);
            }
        };
        checks['numeric'] = {
            'msg': 'The %s field must contain only numbers.',
            'check': function (val) {
                return regExs['numeric'].test(val);
            }
        };
        checks['integer'] = {
            'msg': 'The %s field must contain an integer.',
            'check': function (val) {
                return regExs['integer'].test(val);
            }
        };
        checks['decimal'] = {
            'msg': 'The %s field must contain a decimal number.',
            'check': function (val) {
                return regExs['decimal'].test(val);
            }
        };
        checks['natural'] = {
            'msg': 'The %s field must contain only positive numbers.',
            'check': function (val) {
                return regExs['natural'].test(val);
            }
        };
        checks['naturalNoZero'] = {
            'msg': 'The %s field must contain a number greater than zero.',
            'check': function (val) {
                return regExs['naturalNoZero'].test(val);
            }
        };
        checks['url'] = {
            'msg': 'The %s field must contain a valid URL.',
            'check': function (val) {
                return regExs['url'].test(val);
            }
        };
        checks['creditCard'] = {
            'msg': 'The %s field must contain a valid credit card number.',
            'check': function (val) {
                if (!regExs['numericDash'].test(val)) {
                    return false;
                }
                var str = val.replace(/[ -]+/g, ''), len = str.length, mul = 0, sum = 0, prodArr = [
                        [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9
                        ],
                        [
                            0,
                            2,
                            4,
                            6,
                            8,
                            1,
                            3,
                            5,
                            7,
                            9
                        ]
                    ];
                while (len--) {
                    sum += prodArr[mul][parseInt(str.charAt(len), 10)];
                    mul ^= 1;
                }
                return sum % 10 === 0 && sum > 0;
            }
        };
        checks['fileType'] = {
            'msg': 'The %s field must contain only %s files.',
            'check': function (val, type) {
                var ext = val.substr(val.lastIndexOf('.') + 1);
                var types = type.split(',');
                for (var i = 0; i < types.length; i++) {
                    var stripped = String(types[i]).replace(/^\s+|\s+$/g, '');
                    if (ext == stripped) {
                        return true;
                    }
                }
                return false;
            }
        };
        return checks;
    }();
var utils = function () {
        return {
            isEmpty: function (obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        return false;
                    }
                }
                return true;
            }
        };
    }();
var customs = function (checks, utils) {
        return {
            checks: checks,
            check: function (data, rules) {
                var result = {
                        isValid: false,
                        errs: {}
                    };
                for (var key in data) {
                    if (rules[key]) {
                        var keyErrs = this._checkKey(data[key], rules[key]);
                        if (keyErrs.length) {
                            result.errs[key] = keyErrs;
                        }
                    }
                }
                if (utils.isEmpty(result.errs)) {
                    result.isValid = true;
                    delete result.errs;
                }
                return result;
            },
            _checkKey: function (val, rule) {
                var ruleChecks = rule.split('|'), errs = [];
                if (rule.indexOf('required') == -1 && val === '') {
                    return true;
                }
                for (var i = 0, l = ruleChecks.length; i < l; i++) {
                    var ruleCheck = this._getRuleCheckParts(ruleChecks[i]), result = this._checkRule(val, ruleCheck.rule, ruleCheck.args);
                    if (!result) {
                        errs.push({
                            rule: ruleCheck.rule,
                            msg: checks[ruleCheck.rule].msg
                        });
                    }
                }
                return errs;
            },
            _checkRule: function (val, rule, args) {
                if (!checks[rule]) {
                    throw new Error('There is no check defined by the name: ' + rule);
                }
                return args ? checks[rule].check.apply(checks, [
                    val,
                    args
                ]) : checks[rule].check.apply(checks, [val]);
            },
            _getRuleCheckParts: function (ruleCheck) {
                var parts = /^(.+?)\[(.+)\]$/.exec(ruleCheck);
                return parts ? {
                    rule: parts[1],
                    args: parts[2]
                } : { rule: ruleCheck };
            }
        };
    }(checks, utils);
return customs;

});