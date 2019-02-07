const util = require('util');
const loader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');

class Vehicle {
  constructor(host, port, autoconnect) {
    this._host = host;
    this._port = port;
    this._ssl = false; // not implemented
    this._ready = false;
    if (autoconnect) {
      return this.connect();
    }
  }

  async connect() {
    if (this._ssl) {
      throw 'SSL not yet implemented'
    }

    const plugin_options = {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: ['proto/protos'],
    };

    const plugins = [
      'gimbal',
      'core',
      'calibration',
      'camera',
      'discovery',
      'mission',
      'info',
      'action',
      'telemetry',
    ];

    const pluginsMap = plugins.map((pluginName) => {
      const packageDefinition = loader.loadSync(this._get_plugin_path(pluginName), plugin_options);
      const service = grpc.loadPackageDefinition(packageDefinition);
      const pluginObject = service.dronecode_sdk.rpc[pluginName];
      const pluginInstance = pluginObject[this._get_plugin_service(pluginName)];
      const pluginService = new pluginInstance(this._get_connection(), grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        pluginService.waitForReady(this._get_deadline(5), (error) => {
          if (error) {
            reject(error);
          }
          this._register_plugin(pluginName, pluginObject, pluginService);
          resolve(pluginObject);
        });
      });
    });

    return Promise.all(pluginsMap).then((values) => {
      console.log('[+] Vehicle plugins initialized');
      this._ready = true;
      return this;
    });
  }

  _register_plugin(pluginName, pluginObject, pluginService) {
    console.log(`[+] Registering plugin: ${pluginName}`);
    Object.defineProperty(this,
      pluginName, {
        get: () => {
          return pluginObject;
        }
      },
    );
    Object.defineProperty(this,
      pluginName + 'Service', {
        get: () => {
          return pluginService;
        }
      },
    );
  }
}

//export default Vehicle;

new Vehicle('127.0.0.1', 50051, false).connect().then((vehicle) => {
  console.log(Object.keys(vehicle.telemetry));
});
