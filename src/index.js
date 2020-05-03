import _ from 'lodash';
import Drone from './mavsdk/drone';
import './styles.scss';

console.log("MAVSDK-Javascript")

const drone = new Drone('http://127.0.0.1', 10000, false);

var action;

async function getAction() {
  if (!action) {
    return drone.connect().then((d) => {
      return d.action.then((a) => {
        action = a;
        return action;
      })
    })
  } else {
    return action;
  }
}

function armDrone() {
  getAction().then((a) => {
      a.arm().then(() => {
      console.log('Arming');
    }).catch((e) => {
      console.log(e);
    })
  })
}

function disarmDrone() {
  getAction().then((a) => {
      a.disarm().then(() => {
      console.log('Disarming');
    }).catch((e) => {
      console.log(e);
    })
  })
}

function GetMaximumSpeed() {
  getAction().then((a) => {
      a.getMaximumSpeed().then((response) => {
      console.log(response);
    }).catch((e) => {
      console.log(e);
    })
  })
}

function takeoffDrone() {
  getAction().then((a) => {
      a.takeoff().then(() => {
      console.log('Taking off');
    }).catch((e) => {
      console.log(e);
    })
  })
}

function landDrone() {
  getAction().then((a) => {
      a.land().then(() => {
      console.log('Landing Drone');
    }).catch((e) => {
      console.log(e);
    })
  })
}

function component() {
  const element = document.createElement('div');
  const innerElement = document.createElement('div');
  const armBtn = document.createElement('button');
  const disarmBtn = document.createElement('button');
  const getMaxSpeedBtn = document.createElement('button');
  const landBtn = document.createElement('button');
  const takeoffBtn = document.createElement('button');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'MAVSDK'], ' ');

  element.appendChild(innerElement);

  armBtn.innerHTML = "Arm Drone";
  armBtn.onclick = armDrone;

  disarmBtn.innerHTML = "Disarm Drone";
  disarmBtn.onclick = disarmDrone;

  getMaxSpeedBtn.innerHTML = "Get Maximum Speed";
  getMaxSpeedBtn.onclick = GetMaximumSpeed;

  landBtn.innerHTML = "Land Drone";
  landBtn.onclick = landDrone;

  takeoffBtn.innerHTML = "Takeoff Drone";
  takeoffBtn.onclick = takeoffDrone;

  innerElement.appendChild(armBtn);
  innerElement.appendChild(disarmBtn);
  innerElement.appendChild(getMaxSpeedBtn);
  innerElement.appendChild(takeoffBtn);
  innerElement.appendChild(landBtn);

  return element;
}

document.body.appendChild(component());
