import Vehicle from './dronecode_sdk/vehicle';

new Vehicle('127.0.0.1', 10000, false).connect().then((vehicle) => {
  vehicle.action.then(function(action) {
    action.arm().then(() => {
      console.log('vehicle ready');
      console.log(arguments);
    }).catch((error) => {
      console.log('ponchis');
      console.log(error);
    })
  });
  // console.log(vehicle.action.arm);
});
