'use strict';

var euler = require('../euler');
var assert = require('chai').assert;


var orderOfAccuracy = function( odeFactory, T, steps, exactSolution ) {
  var i, err1=0, ode1=odeFactory(),
         err2=0, ode2=odeFactory();
  ode1.dt = T / steps;
  ode2.dt = T / steps * 0.5;
  for(i=0;i<steps;  i++) { ode1.step(); }
  for(i=0;i<steps*2;i++) { ode2.step(); }
  for(i=0; i<ode1.y.length; i++) { err1 += Math.pow(ode1.y[i]-exactSolution[i],2); }
  for(i=0; i<ode2.y.length; i++) { err2 += Math.pow(ode2.y[i]-exactSolution[i],2); }
  return Math.log( Math.sqrt(err1) / Math.sqrt(err2) ) / Math.log(2);
};

describe("Euler integration", function() {
  var i, f, y0;
  beforeEach(function() {
    f = function(dydt, y) {
      dydt[0] = -y[1];
      dydt[1] =  y[0];
    };

    y0 = [1,0];

    i = new euler( f, y0, {method: 'Euler'});
  });
  
  it("takes a single timestep",function() {
    i.step();
    assert.closeTo( i.y[0], 1, 1e-4 );
    assert.closeTo( i.y[1], 1, 1e-4 );
  });

  it("takes multiple timesteps",function() {
    i.steps(2);
    assert.closeTo(i.y[0], 0, 1e-4 );
    assert.closeTo(i.y[1], 2, 1e-4);
  });

  it("achieves first order accuracy",function() {
    var factory = function() { return new euler( f, [1,0] ); };
    assert.closeTo( orderOfAccuracy( factory, 0.5*Math.PI, 10, [0,1] ), 1, 1e-1 );
  });

});
