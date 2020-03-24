const { ArmRequest, DisarmRequest, TakeoffRequest, KillRequest } = require('./action_pb');
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

    takeoff() {
        const request = new TakeoffRequest();
        return this.plugin.takeoff(request);
    }

    kill() {
      const request = new KillRequest();
      return this.plugin.kill(request);
    }
}


export default Action;
