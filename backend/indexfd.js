import CircuitBreaker  from 'opossum';
  import PrometheusMetrics from 'opossum-prometheus';

  // create a couple of circuit breakers
  const c1 = new CircuitBreaker(someFunction);
  const c2 = new CircuitBreaker(someOtherFunction);

  // Provide them to the constructor
  const prometheus = new PrometheusMetrics({ circuits: [c1, c2] });

  //...
  // Provide other circuit breaker later
  const c3 = new CircuitBreaker(someOtherFunction3);
  prometheus.add([c3]);
  
  // Write metrics to the console
  console.log(await prometheus.metrics());