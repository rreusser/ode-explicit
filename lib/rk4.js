'use strict';

var util = require('./util');

var rk4 = function rk4 ( f, y, options ) {

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
  
  util.extend( this, util.odeWorkspace(5, this.n) );
};

rk4.prototype.step = function() {
  var i, n = this.n, t = this.t,
      y  = this.y,  f  = this.f,
      dt = this.dt, w = this.w0,
      k1 = this.w1, k2 = this.w2,
      k3 = this.w3, k4 = this.w4;

  f(k1, y, t);

  for(i=n-1;i>=0;i--) {
    w[i] = y[i] + 0.5*k1[i]*dt;
  }

  f(k2, w, t+dt*0.5);

  for(i=n-1;i>=0;i--) {
    w[i] = y[i] + 0.5*k2[i]*dt;
  }

  f(k3, w, t+dt*0.5);

  for(i=n-1;i>=0;i--) {
    w[i] = y[i] + k3[i]*dt;
  }

  f(k4, w, t+dt);

  for(i=n-1;i>=0;i--) {
    y[i] += dt/3*(0.5*(k1[i]+k4[i])+k2[i]+k3[i]);
  }

  this.t += this.dt;
};

rk4.prototype.steps = function(count) {
  for(var i=0; i<count; i++) { this.step(); }
};

module.exports = rk4;
