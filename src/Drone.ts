import { PluginInterface, PluginConstructor } from './Plugin';
import Action from './plugins/Action';

// type PluginConfig = {
//   name: string,
//   handler: PluginConstructor
// }

interface SDK {
  action: PluginInterface;
  //caliboration: PluginInterface;
  //camera: PluginInterface;
  //core: PluginInterface;
  //discovery: PluginInterface;
  //gimbal: PluginInterface;
  //info: PluginInterface;
  //mission: PluginInterface;
  //telemetry: PluginInterface;
}

class Drone implements SDK {
  action: PluginInterface;
  private host: string;
  private port: number;
  private ssl: boolean;
  private ready: boolean;
  //private plugins: PluginConfig[];

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
    this.ssl = false; // not implemented
    this.ready = false;

    // Register Core Plugins
    //this.plugins = [
      //{ name: 'action', handler: Action }
    //];

    return this;
  }

  connect(): Drone {
    if (this.ssl) {
      throw 'SSL not yet implemented'
    }

    this.action = new Action(this.getConnectionPath());
    this.ready = true;

    return this;
  }

  isReady() {
    return this.ready;
  }

  private getConnectionPath() {
    return this.host + ":" + this.port;
  }
}

export default Drone;
