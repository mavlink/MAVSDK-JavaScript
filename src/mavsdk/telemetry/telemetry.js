const {
  SubscribePositionRequest,
    SetRatePositionRequest,
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
        request.setRateHz(1.0);
        return this.plugin.setRatePosition(request);
    }

    subscribePosition(callback) {
        const request = new SubscribePositionRequest();
        var stream = this.plugin.subscribePosition(request, {});
        stream.on('data', (response) => {
            callback(response.getPosition());
        });

    }
}

export default Telemetry;
