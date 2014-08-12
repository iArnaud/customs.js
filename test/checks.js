/*
 * test/checks.js:
 *
 * (C) 2014 First Opinion
 * MIT LICENCE
 *
 */ 

define([
  'proclaim',
  'checks'
], function (assert, checks) {


// ----------------------------------------------------------------------------
// test
// ----------------------------------------------------------------------------

describe('checks.js', function () {

  // --------------------------------------------------------------------------
  // required
  // --------------------------------------------------------------------------

  describe('required', function () {
    var check = checks.required.check;

    it('Should return false if value is null or empty', function () {
      assert.isFalse(check(null));
      assert.isFalse(check(''));
    });

    it('Should return true if value is not empty', function () {
      assert.isTrue(check('val'));
    });

  });


  // --------------------------------------------------------------------------
  // default
  // --------------------------------------------------------------------------

  describe('default', function () {
    var check = checks.default.check;

    it('Should return false if value matches default', function () {
      assert.isFalse(check('default', 'default'));
    });

    it('Should return true if value does not match default', function () {
      assert.isTrue(check('not default', 'default'));
    });

  });


  // --------------------------------------------------------------------------
  // email
  // --------------------------------------------------------------------------

  describe('email', function () {
    var check = checks.email.check;

    it('Should return false if email is invalid', function () {
      assert.isFalse(check('a'));
      assert.isFalse(check('0'));
      assert.isFalse(check('@'));
      assert.isFalse(check('@a.b'));
    });

    it('Should return true if email is valid', function () {
      assert.isTrue(check('a@b.c'));
      assert.isTrue(check('a.b@c.d'));
      assert.isTrue(check('a.b.c@d.e.f'));
    });

  });


  // --------------------------------------------------------------------------
  // emails
  // --------------------------------------------------------------------------

  describe('emails', function () {
    var check = checks.emails.check;

    it('Should return false if any email is invalid ', function () {
      assert.isFalse(check('a@b.c, a.b@c.d, a.b.c@d.e.f, fail'));
    });

    it('Should return true if all emails are invalid ', function () {
      assert.isTrue(check('a@b.c, a.b@c.d, a.b.c@d.e.f'));
    });

  });


  // --------------------------------------------------------------------------
  // minLength
  // --------------------------------------------------------------------------

  describe('minLength', function () {
    var check = checks.minLength.check;

    it('Should return false if chars less than min length', function () {
      assert.isFalse(check('value', 6));
    });

    it('Should return true if chars greather than or equal to min length', function () {
      assert.isTrue(check('value', 4));
      assert.isTrue(check('value', 5));
    });

  });


  // --------------------------------------------------------------------------
  // maxLength
  // --------------------------------------------------------------------------

  describe('maxLength', function () {
    var check = checks.maxLength.check;

    it('Should return false if chars more than max length', function () {
      assert.isFalse(check('value', 4));
    });

    it('Should return true if chars less than or equal to max length', function () {
      assert.isTrue(check('value', 5));
      assert.isTrue(check('value', 6));
    });

  });


  // --------------------------------------------------------------------------
  // exactLength
  // --------------------------------------------------------------------------

  describe('exactLength', function () {
    var check = checks.exactLength.check;

    it('Should return false if chars length is lass than or greater than exact length', function () {
      assert.isFalse(check('value', 4));
      assert.isFalse(check('value', 6));
    });

    it('Should return true if chars length is equal to exact length', function () {
      assert.isTrue(check('value', 5));
    });

  });


  // --------------------------------------------------------------------------
  // greaterThan
  // --------------------------------------------------------------------------

  describe('greaterThan', function () {
    var check = checks.greaterThan.check;

    it('Should return false if val is not a decimal', function () {
      assert.isFalse(check('a', 1));
    });

    it('Should return false if val is less than or equal to param', function () {
      assert.isFalse(check('0', 1));
      assert.isFalse(check('1', 1));
    });

    it('Should return true if val is greater than param', function () {
      assert.isTrue(check('2', 1));
    });

  });


  // --------------------------------------------------------------------------
  // lessThan
  // --------------------------------------------------------------------------

  describe('lessThan', function () {
    var check = checks.lessThan.check;

    it('Should return false if val is not a decimal', function () {
      assert.isFalse(check('a', 1));
    });

    it('Should return false if val is greater than or equal to param', function () {
      assert.isFalse(check('2', 1));
      assert.isFalse(check('1', 1));
    });

    it('Should return true if val is less than param', function () {
      assert.isTrue(check('0', 1));
    });

  });


  // --------------------------------------------------------------------------
  // alpha
  // --------------------------------------------------------------------------

  describe('alpha', function () {
    var check = checks.alpha.check;

    it('Returns false if val contains anything other than alphabetical chars', function () {
      assert.isFalse(check('1'));
      assert.isFalse(check('!'));
    });

    it('Should return true if val contains only alphabetical chars', function () {
      assert.isTrue(check('a'));
    });

  });


  // --------------------------------------------------------------------------
  // alphaNumeric
  // --------------------------------------------------------------------------

  describe('alphaNumeric', function () {
    var check = checks.alphaNumeric.check;

    it('Should return false if val contains anything other than alphanumeric chars ', function () {
      assert.isFalse(check('.'));
    });

    it('Should return true if val contains only alphabetical or numeric chars', function () {
      assert.isTrue(check('a1'));
    });

  });


  // --------------------------------------------------------------------------
  // alphaDash
  // --------------------------------------------------------------------------

  describe('alphaDash', function () {
    var check = checks.alphaDash.check;

    it('Should return false if val contains anything other than alphanumeric characters, underscores, or dashes', function () {
      assert.isFalse(check('.'));
    });

    it('Should return true if val contains only alphanumeric characters, underscores, and dashes', function () {
      assert.isTrue(check('a1_-'));
    });

  });


  // --------------------------------------------------------------------------
  // numeric
  // --------------------------------------------------------------------------

  describe('numeric', function () {
    var check = checks.numeric.check;

    it('Should return false if val contains anything other than numeric chars', function () {
      assert.isFalse(check('a'));
      assert.isFalse(check('!'));
      assert.isFalse(check('-1'));   
    });

    it('Should return true if val contains only numeric chars', function () {
      assert.isTrue(check('1'));
    });

  });


  // --------------------------------------------------------------------------
  // integer
  // --------------------------------------------------------------------------

  describe('integer', function () {
    var check = checks.integer.check;

    it('Should return false if val contains anything other than an integer', function () {
      assert.isFalse(check('a'));
      assert.isFalse(check('!'));
      assert.isFalse(check('1-'));
      assert.isFalse(check('1.0'));
    });

    it('Should return true if val contains an integer', function () {
      assert.isTrue(check('1'));
      assert.isTrue(check('-1'));
    });

  });


  // --------------------------------------------------------------------------
  // decimal
  // --------------------------------------------------------------------------

  describe('decimal', function () {
    var check = checks.decimal.check;

    it('Should return false if val contains anything other than a decimal', function () {
      assert.isFalse(check('a'));
      assert.isFalse(check('!'));
      assert.isFalse(check('-'));
    });
    
    it('Should return true if val contains a decimal', function () {
      assert.isTrue(check('-1'));
      assert.isTrue(check('-1.0'));
      assert.isTrue(check('1.0'));
    });

  });


  // --------------------------------------------------------------------------
  // natural
  // --------------------------------------------------------------------------

  describe('natural', function () {
    var check = checks.natural.check;

    it('Should return false if contains anything other than a natural number (1,2,3..)', function () {
      assert.isFalse(check('a'));
      assert.isFalse(check('!'));
      assert.isFalse(check('-'));
      assert.isFalse(check('-1'));
    });

    it('Should return true', function () {
      assert.isTrue(check('0'));
    });

  });


  // --------------------------------------------------------------------------
  // naturalNoZero
  // --------------------------------------------------------------------------

  describe('naturalNoZero', function () {
    var check = checks.naturalNoZero.check;

    it('Should return false if contains anything other than a natural number (1,2,3..)', function () {
      assert.isFalse(check('a'));
      assert.isFalse(check('!'));
      assert.isFalse(check('-'));
      assert.isFalse(check('-1'));
      assert.isFalse(check('0'));
    });

    it('Should return true', function () {
      assert.isTrue(check('1'));
    });

  });


  // --------------------------------------------------------------------------
  // url
  // --------------------------------------------------------------------------

  describe('url', function () {
    var check = checks.url.check;

    it('Should return false if val is not a valid url', function () {
      assert.isFalse(check('foo'));
      assert.isFalse(check('foo:bar'));
      assert.isFalse(check('foo://bar'));
      assert.isFalse(check('http://192.168.8'));
      assert.isFalse(check('http://foo'));
      assert.isFalse(check('http://foo.'));
      assert.isFalse(check('http://foo,com'));
      assert.isFalse(check('http://foo;com'));
      assert.isFalse(check('http://.foo'));
      assert.isFalse(check('foo.com'));
    });

    it('Should return true if val is valid url', function () {
      assert.isTrue(check('http://foo.com/bar_(baz)#bam-1'));
      assert.isTrue(check('https://foo.com/bar_(baz)#bam-1'));
      assert.isTrue(check('ftp://foo.com/bar_(baz)#bam-1'));
      assert.isTrue(check('http://www.foo.com/bar_(baz)#bam-1'));
      assert.isTrue(check('http://192.168.8.5'));
    });

  });


  // --------------------------------------------------------------------------
  // creditCard
  // --------------------------------------------------------------------------

  describe('creditCard', function () {
    var check = checks.creditCard.check;

    it('Should return false if the card contains digits other than numbers dash and spaces', function () {
      assert.isFalse(check('4242.4242.4242.4242'));
    });

    it('Should return false if the card does not pass the luhn check', function () {
      assert.isFalse(check('4242-4242-4242-4243'));
    });

    it('Should return true if the card does pass the luhn check', function () {
      assert.isTrue(check('4242-4242-4242-4242'));
    });

  });


  // --------------------------------------------------------------------------
  // fileType
  // --------------------------------------------------------------------------

  describe('fileType', function () {
    var check = checks.fileType.check;

    it('Should return false if val has no ext', function () {
      assert.isFalse(check('test', 'jpg'));
    });
    
    it('Should return false if val contains ext that does match supported from comma seperarated list', function () {
      assert.isFalse(check('test.gif', 'jpg, png'));
    });

    it('Should return true if val contains ext that matches supported from comma seperated list', function () {
      assert.isTrue(check('test.png', 'jpg, png'));
    });
    
  });

});


});