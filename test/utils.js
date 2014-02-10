/*
 * test/utils.js:
 *
 * (C) 2014 First Opinion
 * MIT LICENCE
 *
 */ 

define([
  'proclaim',
  'utils',
], function (assert, utils) {


//
// 
//
var testIsEmpty = function () {
  it('Should return false if object has a property', function () {
    assert.isFalse(utils.isEmpty({ 'prop': 'val' }));
  });
  it('Should return true if object has no properties', function () {
    assert.isTrue(utils.isEmpty({}));
  });
};

// Test please
describe('utils', function () {
  describe('isEmpty', testIsEmpty);
});


});