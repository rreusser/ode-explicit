'use strict';

var extend = function extend() {
  for(var i=1; i<arguments.length; i++) {
    for(var key in arguments[i]) {
      if(arguments[i].hasOwnProperty(key)) {
        arguments[0][key] = arguments[i][key];
      }
    }
  }
  return arguments[0];
};

var odeWorkspace = function odeWorkspace ( count, n ) {
  var work = {};
  for(var i=0; i<n; i++) { work['w'+i] = new Array( n ); }
  return work;
};


exports.extend = extend;
exports.odeWorkspace = odeWorkspace;
