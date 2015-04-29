'use strict';

function extend() {
  for(var i=1; i<arguments.length; i++) {
    for(var key in arguments[i]) {
      if(arguments[i].hasOwnProperty(key)) {
        arguments[0][key] = arguments[i][key];
      }
    }
  }
  return arguments[0];
}

var odeWorkspace = function( count, n ) {
  var work = {};
  for(var i=0; i<n; i++) { work['w'+i] = new Array( n ); }
  return work;
};

var euler = function euler ( f, y, options ) {

  this.f = f;
  this.y = y;
  this.n = y.length;

  var defaults = {
    dt: 1,
    t: 0
  };

  options = options || {};

  this.dt = options.dt || defaults.dt;
  this.t = options.t || defaults.t;
  
  extend( this, odeWorkspace(1, this.n) );
};

euler.prototype.step = function() {
  this.f( this.w0, this.y, this.t );
  for(var i=0; i<this.n; i++) {
    this.y[i] += this.w0[i] * this.dt;
  }
  this.t += this.dt;
};

euler.prototype.steps = function(n) {
  for(var i=0; i<n; i++) { this.step(); }
};

module.exports = euler;
