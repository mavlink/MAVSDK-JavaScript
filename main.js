const Vehicle = require('./dronecode_sdk/vehicle');

new Vehicle('127.0.0.1', 50051, false).connect().then((vehicle) => {
  vehicle.action.then(function(action) {
    action.arm().then(function(action) {
      action.takeoff();
    });
  });
});
