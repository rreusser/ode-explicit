# [DEPRECATED] ode-explicit

[![Build Status](https://travis-ci.org/rreusser/ode-explicit.svg?branch=master)](https://travis-ci.org/rreusser/ode-explicit)

A simple module for integrating a system of first-order ODEs. 

** This package has been deprecated and replaced with scijs modules. For grealy improved integrators, see any of:**

- [scijs/ode-euler](https://github.com/scijs/ode-euler)
- [scijs/ode-midpoint](https://github.com/scijs/ode-midpoint)
- [scijs/ode-rk4](https://github.com/scijs/ode-rk4)
- [scijs/ode45-cash-karp](https://github.com/scijs/ode45-cash-karp)
- [scijs/integrate-simpson](https://github.com/scijs/integrate-simpson)
- [scijs/integrate-adaptive-simpson](https://github.com/scijs/integrate-adaptive-simpson)

## Usage

The integrators take a derivative function, initial conditions, and a hash of options. The integrator itself is just an object; you have to step it yourself. For example, the differential equations for a circle are:


![\frac{d}{dt}\left[\begin{array}{c}y\_0\\y\_1\end{array}\right] = \left[\begin{array}{c}-y\_1\\y\_0\end{array}\right]](/docs/images/ode-example.png)

Then to set up the integration with initial conditions `y0 = 1`, `y1 = 0` and timestep `dt = 0.1`,

```javsacript
var ode = require('ode-explicit');

var deriv = function(dydt, y, t) {
  dydt[0] = -y[1];
  dydt[1] =  y[0];
};

var y = [1,0];

var integrator = ode.rk4( deriv, y, {dt: 0.1, t: 0} );
```

The available integrators are `euler`, `rk2`, and `rk4`. Adaptive integration is on the way. To take a single timestep,

```javascript
integrator.step();
```

and to take multiple timesteps,

```javascript
integrator.steps(10);
```

The results are accessible in the original vector (or also in `integrator.y`).

## Credits
(c) 2015 Ricky Reusser. MIT License
