/*!
 * test/utils.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'utils'
], function (assert, sinon, _) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('utils.js', function () {

  /* ---------------------------------------------------------------------------
   * isEmpty
   * -------------------------------------------------------------------------*/

  describe('isEmpty', function () {

    it('Should return false if object has a property', function () {
      assert.isFalse(_.isEmpty({ 'prop': 'val' }));
    });

    it('Should return true if object has no properties', function () {
      assert.isTrue(_.isEmpty({}));
    });

  });


  /* ---------------------------------------------------------------------------
   * tmpl
   * -------------------------------------------------------------------------*/

  describe('tmpl', function () {

    it('Should replace bracketed num with corresponding array index', function () {
      var str = '| {0} | {1} | {2} |';
      var data = ['1', '2', '3'];

      assert.equal(_.tmpl(str, data), '| 1 | 2 | 3 |');
    });

  });

});


});