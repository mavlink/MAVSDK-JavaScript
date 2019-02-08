const grpc = require('grpc');
const Plugin = require('./plugin');

class Action {
    constructor(path) {
        this.path = path;
        this.ready = false;
        this.plugin = new Plugin(path, 'action');
        this.service = this.plugin.service;

        return new Promise((resolve, reject) => {
            this.service.waitForReady(this.generateDeadline(5), (error, data) => {
                const stateId = this.service.getChannel().getConnectivityState();
                const stateStr = Object.keys(grpc.connectivityState).find(key => grpc.connectivityState[key] === stateId);
                const state = `Action Plugin State: ${stateStr}`;
                if (error) {
                    if (stateId !== grpc.connectivityState.READY) {
                        throw `${error} | ${state}`;
                    }
                }

                // if (stateId === grpc.connectivityState.READY) {
                //     resolve(this);
                // }
                this.ready = true;
                resolve(this);
            })
        });
    }
    arm() {
        return new Promise((resolve, reject) => {
            if (!this.ready) {
                reject('Action Service not ready');
            }

            const armRequest = this.plugin.basePlugin.ArmRequest;
            this.service.arm(armRequest, (error, response) => {
                if (error) {
                    throw error;
                }

                if (response.action_result.result) {
                    resolve(this);
                }
            });
        });
    }

    takeoff() {
        return new Promise((resolve, reject) => {
            if (!this.ready) {
                reject('Action Service not ready');
            }

            const takeoffRequest = this.plugin.basePlugin.TakeoffRequest;
            this.service.takeoff(takeoffRequest, (error, response) => {
                if (error) {
                    throw error;
                }

                if (response.action_result.result) {
                    resolve(this);
                }
            });
            resolve(this);
        });
    }

    generateDeadline(seconds) {
        return (new Date().getTime()) + (seconds * 1000); // seconds to ms
    }

}

module.exports = Action;