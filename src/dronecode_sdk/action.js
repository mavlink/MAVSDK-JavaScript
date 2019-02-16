// We need to use require instead of import for statically generated code
// from grpc-web since they generate commonjs/goog-closure modules
// https://github.com/google/closure-compiler/wiki/JS-Modules#module-interoperation
const { ArmRequest, TakeoffRequest } = require('./action_pb');
const { ActionServicePromiseClient } = require('./action_grpc_web_pb');

class Action {
    constructor(path) {
        this.path = path;
        this.ready = false;
        this.plugin = new ActionServicePromiseClient(path);

        return this;
    }

    arm() {
        const request = new ArmRequest();
        return this.plugin.arm(request);
    }

    takeoff() {
        const request = new TakeoffRequest();
        return this.plugin.takeoff(request);
    }
}

export default Action;
