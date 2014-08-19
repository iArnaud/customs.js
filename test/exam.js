/*!
 * test/exam.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'checks',
  'exam'
], function (assert, sinon, checks, Exam) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('exam.js', function () {

  /* ---------------------------------------------------------------------------
   * constructor
   * -------------------------------------------------------------------------*/

  describe('constructor', function () {

    beforeEach(function () {
      this.exam = new Exam();
    });

    it('Should set isValid on instance.', function () {
      assert.ok(this.exam.isValid);
    });

    it('Should set empty errors object on instance.', function () {
      assert.deepEqual(this.exam.errors, {});
    });

  });


  /* ---------------------------------------------------------------------------
   * start
   * -------------------------------------------------------------------------*/

  describe('start', function () {

    beforeEach(function () {
      this.checkRulesStub = sinon.stub(Exam.prototype, 'checkRules');
      this.exam = new Exam();
      this.exam.run({
        1: true,
        2: true,
        3: true
      }, {
        1: true,
        2: true 
      });
    });

    afterEach(function () {
      this.checkRulesStub.restore();
    });

    it('Should call checkRules for each item in data that has an accompanying rule.', function () {
      assert.ok(this.checkRulesStub.calledTwice);
    });

  });


  /* ---------------------------------------------------------------------------
   * checkRules
   * -------------------------------------------------------------------------*/

  describe('checkRules', function () {

    beforeEach(function () {
      this.exam = new Exam();
      this.checkRuleStub = sinon.stub(this.exam, 'checkRule');
    });

    it('Should call checkRule for each rule in rules array.', function () {
      this.exam.run({ 1: 'value', 2: 'value' }, {
        1: [ { name: 'required' } ],
        2: [ { name: 'required' } ]
      });

      assert.ok(this.checkRuleStub.calledTwice);
    });

    it('Should skip if empty and not required.', function () {
      this.exam.run({ 1: '', 2: '' }, {
        1: [ { name: 'numeric' } ],
        2: [ { name: 'required' } ]
      });

      assert.ok(this.checkRuleStub.calledOnce);
    });

    it('Should associate array of errors with errors object by using item name.', function () {
      this.checkRuleStub.onFirstCall().returns({
        name: 'numeric',
        msg: 'not numeric fool'
      });

      this.exam.run({ 1: 'str', 2: 'value' }, {
        1: [ { name: 'numeric' } ],
        2: [ { name: 'required' } ]
      });

      assert.deepEqual(this.exam.errors['1'], [{
        name: 'numeric',
        msg: 'not numeric fool'
      }]);
    });

    it('Should not add to instance errors object if no errors found.', function () {
      var exam = new Exam({ 1: 'str', 2: 'value' }, {
        1: [ { name: 'numeric' } ],
        2: [ { name: 'required' } ]
      });

      assert.notOk(exam.errors['1']);
    });

  });


  /* ---------------------------------------------------------------------------
   * checkRule
   * -------------------------------------------------------------------------*/

  describe('checkRule', function () {

    beforeEach(function () {
      this.exam = new Exam();
      this.checksStub = sinon.stub(checks.required, 'check');
      this.formatStub = sinon.stub(this.exam, 'formatError');
    });

    afterEach(function () {
      this.checksStub.restore();
    });

    it('Should throw error if no check method exists for specified rule name.', function () {
      var self = this;
      assert.throws(function () {
        self.exam.checkRule('test', 'test', {
          name: 'fake'
        });
      });
    });

    it('Should return null if check passes.', function () {
      this.checksStub.returns(true);
      var result = this.exam.checkRule('test', 'test', {
        name: 'required'
      });

      assert.isNull(result);
    });

    it('Should return result of formatError if check fails.', function () {
      this.checksStub.returns(false);
      this.formatStub.returns({});
      var result = this.exam.checkRule('test', 'test', {
        name: 'required'
      });

      assert.deepEqual(result, {});
    });

  });


  /* ---------------------------------------------------------------------------
   * formatError
   * -------------------------------------------------------------------------*/

  describe('formatError', function () {

    beforeEach(function () {
      this.exam = new Exam();
    });

    it('Should set isValid to false.', function () {
      var error = this.exam.formatError('test', { name: 'required' });

      assert.isFalse(this.exam.isValid);
    });

    it('Should return object with name of rule as a property.', function () {
      var error = this.exam.formatError('test', { name: 'required' });

      assert.equal(error.name, 'required');
    });

    it('Should return object with templated msg property.', function () {
      var error = this.exam.formatError('test', { name: 'minLength', args: '3' });

      assert.equal(error.msg, 'The test field must be at least 3 characters in length.');
    });

  });

});


});