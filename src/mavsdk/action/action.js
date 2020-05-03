const {
  ActionResult,
  ArmRequest,
  ArmResponse,
  DisarmRequest,
  DisarmResponse,
  GetMaximumSpeedRequest,
  GetMaximumSpeedResponse,
  GetReturnToLaunchAltitudeRequest,
  GetReturnToLaunchAltitudeResponse,
  GetTakeoffAltitudeRequest,
  GetTakeoffAltitudeResponse,
  KillRequest,
  KillResponse,
  LandRequest,
  LandResponse,
  RebootRequest,
  RebootResponse,
  ReturnToLaunchRequest,
  ReturnToLaunchResponse,
  SetMaximumSpeedRequest,
  SetMaximumSpeedResponse,
  SetReturnToLaunchAltitudeRequest,
  SetReturnToLaunchAltitudeResponse,
  SetTakeoffAltitudeRequest,
  SetTakeoffAltitudeResponse,
  TakeoffRequest,
  TakeoffResponse,
  TransitionToFixedWingRequest,
  TransitionToFixedWingResponse,
  TransitionToMulticopterRequest,
  TransitionToMulticopterResponse
   } = require('./action_pb');
const { ActionServicePromiseClient } = require('./action_grpc_web_pb');

class Action {
    constructor(path) {
        this.path = path;
        this.ready = false;

        this.plugin = new ActionServicePromiseClient(path);
        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }

    arm() {
        const request = new ArmRequest();
        return this.plugin.arm(request);
    }

    disarm() {
      const request = new DisarmRequest();
      return this.plugin.disarm(request);
    }

    getMaximumSpeed() {
      const request = new GetMaximumSpeedRequest();
      return this.plugin.getMaximumSpeed(request);
    }

    getReturnToLaunchAltitude() {
      const request = new GetReturnToLaunchAltitudeRequest();
      return this.plugin.getReturnToLaunchAltitude(request);
    }

    getTakeoffAltitude() {
      const request = new GetTakeoffAltitudeRequest();
      return this.plugin.getTakeoffAltitude(request);
    }

    kill() {
      const request = new KillRequest();
      return this.plugin.kill(request);
    }

    land() {
      const request = new LandRequest();
      return this.plugin.land(request);
    }

    reboot() {
      const request = new RebootRequest();
      return this.plugin.reboot(request);
    }

    returnToLaunch() {
      const request = new ReturnToLaunchRequest();
      return this.plugin.returnToLaunch(request);
    }

    setMaximumSpeed() {
      const request = new SetMaximumSpeedRequest();
      return this.plugin.setMaximumSpeed(request);
    }

    setReturnToLaunchAltitude() {
      const request = new SetReturnToLaunchAltitudeRequest();
      return this.plugin.setReturnToLaunchAltitude(request);
    }

    setTakeoffAltitude() {
      const request = new SetTakeoffAltitudeRequest();
      return this.plugin.setTakeoffAltitude(request);
    }

    takeoff() {
        const request = new TakeoffRequest();
        return this.plugin.takeoff(request);
    }

    transitionToFixedWing() {
      const request = new TransitionToFixedWingRequest();
      return this.plugin.transitionToFixedWing(request);
    }

    transitionToMulticopter() {
      const request = new TransitionToMulticopterRequest();
      return this.plugin.transitionToMulticopter(request);
    }

}


export default Action;
