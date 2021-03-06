/*!
 * test/_amd.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'customs/customs'
], function (assert, sinon, Customs) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('amd - customs.js', function () {

  it('Should create a new instance.', function () {
    var customs = new Customs({});
    assert.isInstanceOf(customs, Customs);
  });

});


});