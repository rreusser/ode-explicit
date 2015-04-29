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


/*var Integrators = {

  'Euler': {

    workspaceCount: 1,

    stepper: function EulerStepper() {
      this.f( this.w0, this.y, this.t );
      for(var i=0; i<this.n; i++) {
        this.y[i] += this.w0[i] * this.dt;
      }
      this.t += this.dt;
    }

  },

  'RK2': {

    workspaceCount: 2,

    stepper: function MidpointStepper() {
      this.f( this.w0, this.y, this.t );
      for(var i=0; i<this.n; i++) {
        this.w1[i] = this.y[i] + this.dt * 0.5 * this.w0[i];
      }
      this.f( this.w0, this.w1, this.t + this.dt * 0.5 );
      for(i=0; i<this.n; i++) {
        this.y[i] += this.w0[i] * this.dt;
      }
      this.t += this.dt;
    }

  },

  'RK4': {

    workspaceCount: 5,

    stepper: function MidpointStepper() {
      var i, n = this.n, t = this.t,
          y  = this.y,  f  = this.f,
          dt = this.dt, w = this.w0,
          k1 = this.w1, k2 = this.w2,
          k3 = this.w3, k4 = this.w4;

      f(k1, y, t);

      for(i=n;i>=0;i--) {
        w[i] = y[i] + 0.5*k1[i]*dt;
      }

      f(k2, w, t+dt*0.5);

      for(i=n;i>=0;i--) {
        w[i] = y[i] + 0.5*k2[i]*dt;
      }

      f(k3, w, t+dt*0.5);

      for(i=n;i>=0;i--) {
        w[i] = y[i] + k3[i]*dt;
      }

      f(k4, w, t+dt);

      for(i=n;i>=0;i--) {
        y[i] += dt/3*(0.5*(k1[i]+k4[i])+k2[i]+k3[i]);
      }

      this.t += this.dt;
    }

  },


  'RK5(4)': {

    // Butcher Tableau for Runge-Kutta-Fehlberg RK4(5):
    //
    //   0
    //   1/4     |  1/4
    //   3/8     |  3/32        9/32
    //   12/13   |  1932/2197  −7200/2197    7296/2197
    //   1       |  439/216    −8            3680/513     −845/4104
    //   1/2     | −8/27        2           −3544/2565     1859/4104    −11/40  
    //   --------+-----------------------------------------------------------------------
    //           |  16/135      0            6656/12825    28561/56430  −9/50   2/55
    //           |  25/216      0            1408/2565     2197/4104    −1/5    0

    workspaceCount: 8,

    stepper: function RK45Stepper( output ) {
      var i, n = this.n, t = this.t,
          y  = this.y,  f  = this.f,
          dt = this.dt, w = this.w0,
          k1 = this.w1, k2 = this.w2,
          k3 = this.w3, k4 = this.w4,
          k5 = this.w5, k6 = this.w6;

      f(k1, y, t);

      for(i=n;i>=0;i--) {
        w[i] = y[i] + dt*0.25*k1[i];
      }

      f(k2, w, t+dt*0.25);

      for(i=n;i>=0;i--) {
        w[i] = y[i] + dt*(3/32*k1[i] + 9/32*k2[i]);
      }

      f(k3, w, t + dt*3/8);

      for(i=n;i>=0;i--) {
        w[i] = y[i] + dt*(1932*k1[i] - 7200*k2[i] + 7296*k3[i])/2197;
      }

      f(k4, w, t+dt*12/13);

      for(i=n;i>=0;i--) {
        w[i] = y[i] + dt*(439/216*k1[i] - 8*k2[i] + 3680/513*k3[i] - 845/4104*k4[i]);
      }

      f(k5, w, t+dt);

      for(i=n;i>=0;i--) {
        w[i] = y[i] + dt*(-8/27*k1[i] + 2*k2[i] - 3544/2565*k3[i] + 1859/4104*k4[i] - 11/40*k5[i]);
      }

      f(k6, w, t+dt*0.5);

      for(i=n;i>=0;i--) {
        output[i] = y[i] + dt*(16/135*k1[i] + 6656/12825*k3[i] + 28561/56430*k4[i] - 9/50*k5[i] + 2/55*k6[i]);
      }
    },

    embedded: function RK45Embedded() {
      var i, n = this.n, y = this.y, dt = this.dt;
      for(i=n;i>=0;i--) {
        this.w0[i] = y[i] + dt*(25/216*this.w1[i] + 1408/2565*this.w3[i] + 2197/4104*this.w4[i] - 1/5*this.w5[i]);
      }
    }

  
  }
};*/

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
