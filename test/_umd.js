/*!
 * test/_umd.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'customs/customs'
], function (assert, Customs) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('umd - customs.js', function () {

  it('Should create a new instance.', function () {
    var customs = new Customs({});
    assert.isInstanceOf(customs, Customs);
  });

});


});