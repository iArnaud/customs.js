/*!
 * test/customs.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'exam',
  'customs'
], function (assert, sinon, Exam, Customs) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('customs.js', function () {

  /* ---------------------------------------------------------------------------
   * constructor
   * -------------------------------------------------------------------------*/

  describe('constructor', function () {
    beforeEach(function () {
      this.buildStub = sinon.stub(Customs.prototype, 'build');
      this.buildStub.returns('text');

      this.customs = new Customs({});
    });

    afterEach(function () {
      this.buildStub.restore();
    });

    it('Should add rules to instance as returned value of build method.', function () {


      assert.equal(this.customs.rules, 'text');
    });

  });


  /* ---------------------------------------------------------------------------
   * build
   * -------------------------------------------------------------------------*/

  describe('build', function () {

    beforeEach(function () {
      this.buildStub = sinon.stub(Customs.prototype, 'build');
      this.buildRulesStub = sinon.stub(Customs.prototype, 'buildRules');
      this.buildRulesStub.onFirstCall().returns('1');
      this.buildRulesStub.onSecondCall().returns('2');

      this.customs = new Customs();
    });

    afterEach(function () {
      this.buildRulesStub.restore();
    });

    it('Should call buildRules for each definition passed.', function () {
      this.buildStub.restore();

      this.customs.build({ '1': true, '2': true });

      assert.ok(this.buildRulesStub.calledTwice);
    });

    it('Should return formatted definitions object.', function () {
      this.buildStub.restore();

      var formatted = this.customs.build({ '1': true, '2': true });

      assert.deepEqual(formatted, {
        1: '1',
        2: '2'
      });
    });

  });


  /* ---------------------------------------------------------------------------
   * buildRules
   * -------------------------------------------------------------------------*/

  describe('buildRules', function () {

    beforeEach(function () {
      this.buildStub = sinon.stub(Customs.prototype, 'build');
      this.parseStub = sinon.stub(Customs.prototype, 'parseRule');
      this.parseStub.onFirstCall().returns({ name: '1' });
      this.parseStub.onSecondCall().returns({ name: '2' });
      this.parseStub.onThirdCall().returns({ name: '3'});

      this.customs = new Customs();
    });

    afterEach(function () {
      this.buildStub.restore();
      this.parseStub.restore();
    });

    it('Should return array of results of parseRule.', function () {
      var rules = this.customs.buildRules('1|2|3');
      
      assert.deepEqual(rules, [
        { name: '1' },
        { name: '2' },
        { name: '3' }
      ]);
    });

    it('Should add required to begining of array.', function () {
      this.parseStub.onThirdCall().returns({ name: 'required' });
      
      var rules = this.customs.buildRules('1|2|required');

      assert.deepEqual(rules, [
        { name: 'required' },
        { name: '1' },
        { name: '2' }
      ]);
    });

  });


  /* ---------------------------------------------------------------------------
   * parseRule
   * -------------------------------------------------------------------------*/

  describe('parseRule', function () {

    beforeEach(function () {
      this.buildStub = sinon.stub(Customs.prototype, 'build');
      this.customs = new Customs();
    });

    afterEach(function () {
      this.buildStub.restore();
    });

    it('Should return object with a name property.', function () {
      var parsed = this.customs.parseRule('range');

      assert.deepEqual(parsed, {
        name: 'range'
      });
    });

    it('Should return object with an args property.', function () {
      var parsed = this.customs.parseRule('range[3]');

      assert.deepEqual(parsed, {
        name: 'range',
        args: '3'
      });
    });

  });


  /* ---------------------------------------------------------------------------
   * check
   * -------------------------------------------------------------------------*/

  describe('check', function () {

    beforeEach(function () {
      this.buildStub = sinon.stub(Customs.prototype, 'build');
      this.examStub = sinon.stub(Exam.prototype, 'run', function () {
        this.isValid = false;
        this.errors = { 1: true };
      });

      this.customs = new Customs();
    });

    afterEach(function () {
      this.buildStub.restore();
      this.examStub.restore();
    });

    it('Should return results.', function () {
      var result = this.customs.check({});

      assert.deepEqual(result, {
        isValid: false,
        errors: { 1: true }
      });
    });

  });

});


});