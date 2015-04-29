'use strict';

var ode = require('../lib/ode-explicit');
var assert = require('chai').assert;
var support = require('./support');
var orderOfAccuracy = support.orderOfAccuracy;


describe("Euler integration", function() {

  var i, f, y0;

  beforeEach(function() {
    f = function(dydt, y) {
      dydt[0] = -y[1];
      dydt[1] =  y[0];
    };

    y0 = [1,0];

    i = new ode.euler( f, y0 );
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
    var factory = function() { return new ode.euler( f, [1,0] ); };
    assert.closeTo( orderOfAccuracy( factory, 0.5*Math.PI, 10, [0,1] ), 1, 1e-1 );
  });

});
