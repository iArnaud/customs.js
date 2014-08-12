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

  /**
   * Determine if an object is empty.
   *
   * @example
   * var isEmpty = isEmpty({});
   * // true
   *
   * @public
   *
   * @param {object} obj - obj to run isEmpty test on
   * @reutns {boolean} - true if object is empty. false if not.
   */
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

  /**
   * Micro template function.
   *
   * @example
   * var msg = tmpl('{0}', ['msg']);
   *
   * @public
   *
   * @param {string} str - string to template.
   * @param {array} data - array of values to template.
   * @reutns {str} - error msg string.
   */
  tmpl: function (str, data) {
    return str.replace(/{([^{}]*)}/g, function(a, b) {
      return typeof data[b] === 'string' ? data[b] : a;
    });
  }

};


});