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

exports.orderOfAccuracy = orderOfAccuracy;
