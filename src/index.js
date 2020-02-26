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

function disarmDrone() {
  action.disarm().then(() => {
    console.log('Disarming');
  }).catch((e) => {
    console.log(e);
  })
}

function takeoffDrone() {
  action.takeoff().then(() => {
    console.log('Taking off');
  }).catch((e) => {
    console.log(e);
  })
}

function killDrone() {
  action.kill().then(() => {
    console.log('Killing Drone');
  }).catch((e) => {
    console.log(e);
  })
}

function component() {
  const element = document.createElement('div');
  const innerElement = document.createElement('div');
  const armBtn = document.createElement('button');
  const disarmBtn = document.createElement('button');
  const takeoffBtn = document.createElement('button');
  const killBtn = document.createElement('button');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'MAVSDK'], ' ');

  element.appendChild(innerElement);

  armBtn.innerHTML = "Arm Drone";
  armBtn.onclick = armDrone;

  takeoffBtn.innerHTML = "Takeoff Drone";
  takeoffBtn.onclick = takeoffDrone;

  disarmBtn.innerHTML = "Disarm Drone";
  disarmBtn.onclick = disarmDrone;

  killBtn.innerHTML = "Kill Drone";
  killBtn.onclick = killDrone;

  innerElement.appendChild(armBtn);
  innerElement.appendChild(takeoffBtn);
  innerElement.appendChild(disarmBtn);
  innerElement.appendChild(killBtn);

  return element;
}

document.body.appendChild(component());
