import { PluginInterface, PluginConstructor } from '../Plugin';
// import { ArmRequest, TakeoffRequest, ActionServicePromiseClient } from 'DronecodeSDK';
import * as DronecodeSDK from 'DronecodeSDK';

class Action implements PluginInterface {
    path: string;
    ready: boolean;
    plugin: any;

    constructor(path:string) {
        this.path = path;
        this.ready = false;
        // this.plugin = new ActionServicePromiseClient(path);
        this.plugin = true;
        console.log(DronecodeSDK);

        return this;
    }

    // arm() {
    //     const request = new ArmRequest();
    //     return this.plugin.arm(request);
    // }

    // takeoff() {
    //     const request = new TakeoffRequest();
    //     return this.plugin.takeoff(request);
    // }
}

export default Action;
