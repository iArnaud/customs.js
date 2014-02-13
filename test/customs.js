/*
 * test/customs.js:
 *
 * (C) 2014 First Opinion
 * MIT LICENCE
 *
 */ 

define([
  'proclaim',
  'customs',
], function (assert, customs) {


//
// 
//
var testChecks = function () {
  it('Should expose checks methods', function () {
    assert.isObject(customs.checks);
  });
};

//
// 
//
var testGetRuleCheckParts = function () {
  it('Should return object with rule and args property', function () {
  	var rule = customs._getRuleCheckParts('rule[args]');
    assert.isObject(rule);
    assert.equal(rule.rule, 'rule');
    assert.equal(rule.args, 'args');
  });
  it('Should not return args prop if no args passed', function () {
    var rule = customs._getRuleCheckParts('rule');
    assert.isUndefined(rule.args);
  });
};

//
// 
//
var testCheckRule = function () {
  it('Throw error if check type does not exist', function () {
    assert.throws(function () {
      customs._checkRule('fake', 'noExist');
    }, 'There is no check defined by the name: noExist');
  });
  it('Should return true if check passes', function () {
    assert.isTrue(customs._checkRule('true', 'exactLength', '4'));
  });
  it('Should return false if check fails', function () {
    assert.isFalse(customs._checkRule('false', 'exactLength', '4'));
  });
};

//
// 
//
var testCheckKey = function () {
  it('Should return true if val is empty and not required', function () {
    assert.isTrue(customs._checkKey('name', '', 'minLength[3]'));
  });
  it('Should return array of error objects', function () {
    assert.deepEqual(customs._checkKey('name', 'val-u', 'maxLength[4]|alphaNumeric'), [
      { rule: 'maxLength', msg: 'The name field must not exceed 4 characters in length.' },
      { rule: 'alphaNumeric', msg: 'The name field must only contain alpha-numeric characters.' }
    ]);
  });
  it('Should return empty array if no errors', function () {
    assert.deepEqual(customs._checkKey('name', 'valu', 'maxLength[4]|alphaNumeric'), []);
  });
};

//
// 
//
var testCheck = function () {
  it('Should return object with isValid and errs prop on err', function () {
    var validation = customs.check({
      'name': '',
      'email': 'test@email.com',
      'age': 'fail'
    }, {
      'name': 'required|minLength[2]',
      'email': 'required|email',
      'age': 'numeric'
    });
    assert.isObject(validation);
    assert.isFalse(validation.isValid);
    assert.deepEqual(validation.errs, {
      'name': [
        { rule: 'required', msg: 'The name field is required.' },
        { rule: 'minLength', msg: 'The name field must be at least 2 characters in length.' }
      ],
      'age': [
        { rule: 'numeric', msg: 'The age field must contain only numbers.' }
      ]
    });
  });
  it('Should return object with isValid true on successful validation', function () {
    var validation = customs.check({ 'name': 'true' }, { 'name': 'required' });
    assert.isObject(validation);
    assert.isTrue(validation.isValid);
  });
};

// Test please
describe('customs', function () {
  describe('checks', testChecks);
  describe('_getRuleCheckParts', testGetRuleCheckParts);
  describe('_checkRule', testCheckRule);
  describe('_checkKey', testCheckKey);
  describe('check', testCheck);
});


});