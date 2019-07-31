import Drone from './mavsdk/drone';

new Drone('http://127.0.0.1', 10000, false).connect().then((drone) => {
  drone.action.then(function(action) {
    action.arm().then(() => {
      console.log('Drone ready');
      console.log(arguments);
    }).catch((error) => {
      console.log('Arming failed!');
      console.log(error);
    }).then(() => {
        console.log('Taking off');
        action.takeoff()
    }).catch((error) => {
        console.log('Takeoff failed');
        console.log(error);
    });
  });
});
