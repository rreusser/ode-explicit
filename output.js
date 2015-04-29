(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var util = require('./util');

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
  
  util.extend( this, util.odeWorkspace(1, this.n) );
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

},{"./util":4}],2:[function(require,module,exports){
'use strict';

exports.euler = require('./euler');
exports.rk2 = require('./rk2');


},{"./euler":1,"./rk2":3}],3:[function(require,module,exports){
'use strict';

var util = require('./util');

var rk2 = function rk2 ( f, y, options ) {

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
  
  util.extend( this, util.odeWorkspace(2, this.n) );
};

rk2.prototype.step = function() {
  this.f( this.w0, this.y, this.t );
  for(var i=0; i<this.n; i++) {
    this.w1[i] = this.y[i] + this.dt * 0.5 * this.w0[i];
  }
  this.f( this.w0, this.w1, this.t + this.dt * 0.5 );
  for(i=0; i<this.n; i++) {
    this.y[i] += this.w0[i] * this.dt;
  }
  this.t += this.dt;
};

rk2.prototype.steps = function(n) {
  for(var i=0; i<n; i++) { this.step(); }
};

module.exports = rk2;

},{"./util":4}],4:[function(require,module,exports){
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

},{}]},{},[2]);
