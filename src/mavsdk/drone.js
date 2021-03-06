import Action from './action/action';
import Telemetry from './telemetry/telemetry';

class Drone {
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

    if (this._ready) {
      return this;
    }

    const plugin_options = {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: ['proto/protos'],
    };

    /*
    REGISTER YOUR PLUGINS HERE
    */
    const plugins = [
      { name: 'action', handler: Action },
      { name: 'telemetry', handler: Telemetry },
    ];

    const pluginsMap = plugins.map((pluginObject) => {
      return new Promise((resolve, reject) => {
        const plugin = new pluginObject.handler(this.getConnectionPath());
        this.registerPlugin(pluginObject.name, plugin);
        resolve(plugin);
      });
    });

    return Promise.all(pluginsMap).then((values) => {
      this._ready = true;
      return this;
    });
  }

  getConnectionPath(pluginName) {
    return this._host + ":" + this._port;
  }

  registerPlugin(pluginName, plugin) {
    Object.defineProperty(this,
      pluginName, {
        get: () => {
          return plugin;
        }
      },
    );
  }
}

export default Drone;
