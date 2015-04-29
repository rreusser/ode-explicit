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

  it("is first order accurate",function() {
    var factory = function() { return new euler( f, [1,0] ); };
    assert.closeTo( orderOfAccuracy( factory, 0.5*Math.PI, 10, [0,1] ), 1, 1e-1 );
  });

});

/*
  xdescribe("RK2", function() {
    var i;

    beforeEach(function() {
      i = new ode.rk( f, y0, {method: 'RK2'} );
    });

    it("Takes a single timestep",function() {
      i.dt = 1.0;
      i.step();
      assert.closeTo( i.y[0], 0.5, 1e-4 );
      assert.closeTo( i.y[1], 1, 1e-4 );
    });

    it("Integrates halfway around a circle",function() {
      var n = 20;
      i.dt = Math.PI / n;
      for(var j=0; j<n; j++) i.step();
      assert.closeTo(i.y[0], -1, 1e-1);
      assert.closeTo(i.y[1], 0, 1e-1);
    });

    it("is second order accurate",function() {
      // Compute two approximations that differ by a refinement factor and confirm
      // that the error is reduced by (1/factor)^2:
      var expectedOrder = 2;
      var j, n = 10, factor = 3;

      // Integrate one quadrant of a circle:
      var y1 = [1,0];
      var y2 = [1,0];
      var i1 = new ode.rk( f, y1, {method: 'RK2', dt: 0.5 * Math.PI / n } );
      var i2 = new ode.rk( f, y2, {method: 'RK2', dt: 0.5 * Math.PI / (factor*n) } );
      for(j=0; j<n; j++) i1.step();
      for(j=0; j<n*factor; j++) i2.step();

      // Calculate the error of each approximation:
      var error1 = Math.sqrt(Math.pow(y1[0],2) + Math.pow(y1[1]-1,2));
      var error2 = Math.sqrt(Math.pow(y2[0],2) + Math.pow(y2[1]-1,2));

      // Calculate the observed order of convergence:
      var observedOrder = Math.log( error1 / error2 ) / Math.log(factor);

      assert.closeTo( observedOrder, expectedOrder, 1e-1 );
    });

  });

  xdescribe("RK4", function() {
    var i;

    beforeEach(function() {
      i = new ode.rk( f, y0, {method: 'RK4'} );
    });

    it("Integrates halfway around a circle",function() {
      var n = 20;
      i.dt = Math.PI / n;
      for(var j=0; j<n; j++) i.step();
      assert.closeTo( i.y[0], -1, 1e-2 );
      assert.closeTo( i.y[1], 0, 1e-2 );
    });

    it("is fourth order accurate",function() {
      // Compute two approximations that differ by a refinement factor and confirm
      // that the error is reduced by (1/factor)^2:
      var expectedOrder = 4;
      var j, n = 10, factor = 3;

      // Integrate one quadrant of a circle:
      var y1 = [1,0];
      var y2 = [1,0];
      var i1 = new ode.rk( f, y1, {method: 'RK4', dt: 0.5 * Math.PI / n } );
      var i2 = new ode.rk( f, y2, {method: 'RK4', dt: 0.5 * Math.PI / (factor*n) } );
      for(j=0; j<n; j++) i1.step();
      for(j=0; j<n*factor; j++) i2.step();

      // Calculate the error of each approximation:
      var error1 = Math.sqrt(Math.pow(y1[0],2) + Math.pow(y1[1]-1,2));
      var error2 = Math.sqrt(Math.pow(y2[0],2) + Math.pow(y2[1]-1,2));

      // Calculate the observed order of convergence:
      var observedOrder = Math.log( error1 / error2 ) / Math.log(factor);

      assert.closeTo( observedOrder, expectedOrder, 1e-1 );
    });

  });


  xdescribe("RK5(4)", function() {
    var i;

    beforeEach(function() {
      i = new ode.rk( f, y0, {method: 'RK5(4)'} );
    });

    it("Integrates halfway around a circle",function() {
      var n = 20;
      i.dt = Math.PI / n;
      for(var j=0; j<n; j++) i.step();
      assert.closeTo( i.y[0], -1, 1e-2 );
      assert.closeTo( i.y[1], 0, 1e-2 );
    });

    it("is fifth order accurate",function() {
      // Compute two approximations that differ by a refinement factor and confirm
      // that the error is reduced by (1/factor)^2:
      var expectedOrder = 5;
      var j, n = 10, factor = 3;

      // Integrate one quadrant of a circle:
      var y1 = [1,0];
      var y2 = [1,0];
      var i1 = new ode.rk( f, y1, {method: 'RK5(4)', dt: 0.5 * Math.PI / n } );
      var i2 = new ode.rk( f, y2, {method: 'RK5(4)', dt: 0.5 * Math.PI / (factor*n) } );
      for(j=0; j<n; j++) i1.step();
      for(j=0; j<n*factor; j++) i2.step();

      // Calculate the error of each approximation:
      var error1 = Math.sqrt(Math.pow(y1[0],2) + Math.pow(y1[1]-1,2));
      var error2 = Math.sqrt(Math.pow(y2[0],2) + Math.pow(y2[1]-1,2));

      // Calculate the observed order of convergence:
      var observedOrder = Math.log( error1 / error2 ) / Math.log(factor);

      assert.closeTo( observedOrder, expectedOrder, 1e-1 );
    });

  });


});*/
