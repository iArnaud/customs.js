/*!
 * test/_dist-umd.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'customs/customs'
], function (assert, sinon, Customs) {


// ----------------------------------------------------------------------------
// Test
// ----------------------------------------------------------------------------

describe('umd - customs.js', function () {

  it('Should create a new instance.', function () {
    var customs = new Customs({});
    assert.isInstanceOf(customs, Customs);
  });

});


});