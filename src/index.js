import _ from 'lodash';
import Drone from './mavsdk/drone';
import './styles.scss';

console.log("MAVSDK-Javascript")

const drone = new Drone('http://127.0.0.1', 10000, false);
var action;

function armDrone() {
  drone.connect().then((d) => {
    d.action.then((a) => {
      action = a;
      a.arm().then(() => {
        console.log('Arming');
      }).catch((e) => {
        console.log(e);
      })
    })
  })
}

function takeoffDrone() {
  action.takeoff().then(() => {
    console.log('Taking off');
  }).catch((e) => {
    console.log(e);
  })
}

function component() {
  const element = document.createElement('div');
  const innerElement = document.createElement('div');
  const armBtn = document.createElement('button');
  const takeoffBtn = document.createElement('button');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'MAVSDK'], ' ');

  element.appendChild(innerElement);

  armBtn.innerHTML = "Arm Drone";
  armBtn.onclick = armDrone;

  takeoffBtn.innerHTML = "Takeoff Drone";
  takeoffBtn.onclick = takeoffDrone;

  innerElement.appendChild(armBtn);
  innerElement.appendChild(takeoffBtn);

  return element;
}

document.body.appendChild(component());
