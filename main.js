const Vehicle = require('./dronecode_sdk/vehicle');

new Vehicle('127.0.0.1', 50051, false).connect().then((vehicle) => {
  console.log(Object.getOwnPropertyNames(vehicle));
});
