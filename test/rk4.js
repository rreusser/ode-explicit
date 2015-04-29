'use strict';

var ode = require('../lib/ode-explicit');
var assert = require('chai').assert;
var support = require('./support');
var orderOfAccuracy = support.orderOfAccuracy;


describe("RK4 integration", function() {

  var f, y0;

  beforeEach(function() {
    f = function(dydt, y) {
      dydt[0] = -y[1];
      dydt[1] =  y[0];
    };

    y0 = [1,0];
  });
  
  it("integrates halfway around a circle",function() {
    var n = 20;
    var i = new ode.rk4( f, y0, {dt: Math.PI / n} );
    i.steps(n);
    assert.closeTo(i.y[0], -1, 1e-1);
    assert.closeTo(i.y[1], 0, 1e-1);
  });

  it("achieves fourth order accuracy",function() {
    var factory = function() { return new ode.rk4( f, [1,0] ); };
    assert.closeTo( orderOfAccuracy( factory, 0.5*Math.PI, 10, [0,1] ), 4, 1e-1 );
  });

});
