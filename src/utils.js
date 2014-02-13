/*!
 * utils.js
 * 
 * Copyright (c) 2014
 */

define(function () {


// ----------------------------------------------------------------------------
// Utils
// ----------------------------------------------------------------------------
return {
  //
  //
  //
  isEmpty: function (obj) {
    // Array
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      return (obj.length > 0);
    }

    // Object
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) { return false; }
    }
    return true;
  },

  //
  //
  //
  formatStr: function(str, obj) {
    return str.replace(/{([^{}]*)}/g, function(a, b) {
      var r = obj[b];
      return typeof r === 'string' ? r : a;
    });
  }
};


});