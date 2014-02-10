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
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) { return false; }
    }
    return true;
  }
};


});