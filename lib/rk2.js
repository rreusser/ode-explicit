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

  for(var i=this.n-1; i>=0; i--) {
    this.w1[i] = this.y[i] + this.dt * 0.5 * this.w0[i];
  }

  this.f( this.w0, this.w1, this.t + this.dt * 0.5 );

  for(var i=this.n-1; i>=0; i--) {
    this.y[i] += this.w0[i] * this.dt;
  }

  this.t += this.dt;
};

rk2.prototype.steps = function(n) {
  for(var i=0; i<n; i++) { this.step(); }
};

module.exports = rk2;
