;(function (name, context, definition) {
  if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
  else if (typeof define === 'function' && define.amd) { define(definition); }
  else { context[name] = definition(); }
})('customs', this, function () {
var utils = function () {
        return {
            isEmpty: function (obj) {
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    return obj.length > 0;
                }
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        return false;
                    }
                }
                return true;
            },
            formatStr: function (str, obj) {
                return str.replace(/{([^{}]*)}/g, function (a, b) {
                    var r = obj[b];
                    return typeof r === 'string' ? r : a;
                });
            }
        };
    }();
var checks = function (utils) {
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
            'msg': 'The {0} field is required.',
            'check': function (val) {
                return val !== null && typeof val == 'object' ? utils.isEmpty(val) : val !== null && val !== '';
            }
        };
        checks['default'] = {
            'msg': 'The {0} field is still set to default, please change.',
            'check': function (val, name) {
                return val !== name;
            }
        };
        checks['email'] = {
            'msg': 'The {0} field must contain a valid email address.',
            'check': function (val) {
                return regExs['email'].test(val);
            }
        };
        checks['emails'] = {
            'msg': 'The {0} field must contain all valid email addresses.',
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
            'msg': 'The {0} field must be at least {1} characters in length.',
            'check': function (val, length) {
                return !regExs['numeric'].test(length) ? false : val.length >= parseInt(length, 10);
            }
        };
        checks['maxLength'] = {
            'msg': 'The {0} field must not exceed {1} characters in length.',
            'check': function (val, length) {
                return !regExs['numeric'].test(length) ? false : val.length <= parseInt(length, 10);
            }
        };
        checks['exactLength'] = {
            'msg': 'The {0} field must be exactly {1} characters in length.',
            'check': function (val, length) {
                return !regExs['numeric'].test(length) ? false : val.length === parseInt(length, 10);
            }
        };
        checks['greaterThan'] = {
            'msg': 'The {0} field must contain a number greater than {1}.',
            'check': function (val, param) {
                return !regExs['decimal'].test(val) ? false : parseFloat(val) > parseFloat(param);
            }
        };
        checks['lessThan'] = {
            'msg': 'The {0} field must contain a number less than {1}.',
            'check': function (val, param) {
                return !regExs['decimal'].test(val) ? false : parseFloat(val) < parseFloat(param);
            }
        };
        checks['alpha'] = {
            'msg': 'The {0} field must only contain alphabetical characters.',
            'check': function (val) {
                return regExs['alpha'].test(val);
            }
        };
        checks['alphaNumeric'] = {
            'msg': 'The {0} field must only contain alpha-numeric characters.',
            'check': function (val) {
                return regExs['alphaNumeric'].test(val);
            }
        };
        checks['alphaDash'] = {
            'msg': 'The {0} field must only contain alpha-numeric characters, underscores, and dashes.',
            'check': function (val) {
                return regExs['alphaDash'].test(val);
            }
        };
        checks['numeric'] = {
            'msg': 'The {0} field must contain only numbers.',
            'check': function (val) {
                return regExs['numeric'].test(val);
            }
        };
        checks['integer'] = {
            'msg': 'The {0} field must contain an integer.',
            'check': function (val) {
                return regExs['integer'].test(val);
            }
        };
        checks['decimal'] = {
            'msg': 'The {0} field must contain a decimal number.',
            'check': function (val) {
                return regExs['decimal'].test(val);
            }
        };
        checks['natural'] = {
            'msg': 'The {0} field must contain only positive numbers.',
            'check': function (val) {
                return regExs['natural'].test(val);
            }
        };
        checks['naturalNoZero'] = {
            'msg': 'The {0} field must contain a number greater than zero.',
            'check': function (val) {
                return regExs['naturalNoZero'].test(val);
            }
        };
        checks['url'] = {
            'msg': 'The {0} field must contain a valid URL.',
            'check': function (val) {
                return regExs['url'].test(val);
            }
        };
        checks['creditCard'] = {
            'msg': 'The {0} field must contain a valid credit card number.',
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
            'msg': 'The {0} field must contain only {1} files.',
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
    }(utils);
var customs = function (checks, utils) {
        return {
            checks: checks,
            check: function (data, rules) {
                var result = {
                        isValid: false,
                        errs: {}
                    };
                for (var key in data) {
                    if (rules && rules[key]) {
                        var keyErrs = this._checkKey(key, data[key], rules[key]);
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
            _checkKey: function (name, val, rule) {
                var ruleChecks = rule.split('|'), errs = [];
                if (rule.indexOf('required') == -1 && val === '') {
                    return true;
                }
                for (var i = 0, l = ruleChecks.length; i < l; i++) {
                    var ruleCheck = this._getRuleCheckParts(ruleChecks[i]), result = this._checkRule(val, ruleCheck.rule, ruleCheck.args);
                    if (!result) {
                        var formatArgs = [name];
                        if (typeof ruleCheck.args !== 'undefined') {
                            formatArgs = formatArgs.concat(ruleCheck.args);
                        }
                        var msg = utils.formatStr(checks[ruleCheck.rule].msg, formatArgs);
                        errs.push({
                            rule: ruleCheck.rule,
                            msg: msg
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