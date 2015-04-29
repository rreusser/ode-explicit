# Runge-Kutta Integrators

A simple module for integrating a system of first-order ODEs. 

## Usage

The integrators take a derivative function, initial conditions, and a hash of options. The integrator itself is just an object; you have to step it yourself. For example, the differential equations for a circle are:

```
/  dy0
|  ---   =  - y1
|  dt
|
|  dy1
|  ---   =    y0
\  dt
```

Then to set up the integration with initial conditions y0 = 1, y1 = 0 and timestep dt = 0.1,

```javsacript
var ode = require('ode-explicit');

var deriv = function(dydt, y, t) {
  dydt[0] = -y[1];
  dydt[1] =  y[0];
};

var y = [1,0];

var integrator = ode.rk4( deriv, y, {dt: 0.1, t: 0} );
```

To take a single timestep,

```javascript
integrator.step();
```

and to take multiple timesteps,

```javascript
integrator.steps(10);
```

The results are accessible in `integrator.y`.



## Credits
(c) 2015 Ricky Reusser. MIT License
