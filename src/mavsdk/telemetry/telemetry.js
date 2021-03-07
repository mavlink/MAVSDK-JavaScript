const {
  SubscribePositionRequest,
  SubscribeAttitudeEulerRequest,
  SetRatePositionRequest,
  SetRateAttitudeRequest,
} = require('./telemetry_pb');
const { TelemetryServicePromiseClient } = require('./telemetry_grpc_web_pb');

class Telemetry {
    constructor(path) {
        this.path = path;
        this.ready = false;

        this.plugin = new TelemetryServicePromiseClient(path);
        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }

    setRatePosition() {
        const request = new SetRatePositionRequest();
        // TODO: hardcoded for now
        request.setRateHz(5.0);
        return this.plugin.setRatePosition(request);
    }

    setRateAttitude() {
        const request = new SetRateAttitudeRequest();
        // TODO: hardcoded for now
        request.setRateHz(5.0);
        return this.plugin.setRateAttitude(request);
    }

    subscribePosition(callback) {
        const request = new SubscribePositionRequest();
        var stream = this.plugin.subscribePosition(request, {});
        stream.on('data', (response) => {
            callback(response.getPosition());
        });
    }

    subscribeAttitude(callback) {
        const request = new SubscribeAttitudeEulerRequest();
        var stream = this.plugin.subscribeAttitudeEuler(request, {});
        stream.on('data', (response) => {
            callback(response.getAttitudeEuler());
        });
    }
}

export default Telemetry;
