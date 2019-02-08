const Action = require('./action');

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

    /*
    REGISTER YOUR PLUGINS HERE
    */
    const plugins = [
      { name: 'action', handler: Action },
      // { name: 'gimbal', handler: Action },
      // { name: 'core', handler: Action },
      // { name: 'calibration', handler: Action },
      // { name: 'camera', handler: Action },
      // { name: 'discovery', handler: Action },
      // { name: 'mission', handler: Action },
      // { name: 'info', handler: Action },
      // { name: 'telemetry', handler: Action },
    ];

    const pluginsMap = plugins.map((pluginObject) => {
      return new Promise((resolve, reject) => {
        const plugin = new pluginObject.handler(this.getConnectionPath());

        this.registerPlugin(pluginObject.name, plugin);
        resolve(plugin);
      });
    });

    return Promise.all(pluginsMap).then((values) => {
      // console.log('[+] Vehicle plugins initialized');
      this._ready = true;
      return this;
    });
  }

  getConnectionPath(pluginName) {
    return this._host + ":" + this._port;
  }

  _get_connection(pluginName) {
    return this._host + ":" + this._port;
  }

  _get_deadline(seconds) {
    return (new Date().getTime()) + (seconds * 1000); // seconds to ms + current time
  }

  registerPlugin(pluginName, plugin) {
    // console.log(`[+] Registering plugin: ${pluginName}`);
    Object.defineProperty(this,
      pluginName, {
        get: () => {
          return plugin;
        }
      },
    );
  }
}

module.exports = Vehicle;
