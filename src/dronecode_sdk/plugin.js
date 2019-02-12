// const loader = require('@grpc/proto-loader');
// const grpc = require('@grpc/grpc-js');

const pluginOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: ['proto/protos'],
};

class Plugin {
    constructor(path, name) {
        this.path = path;
        this.name = name;
        // const packageDefinition = loader.loadSync(this.getProtoPath(), pluginOptions);
        // this.dronecode_sdk = grpc.loadPackageDefinition(packageDefinition).dronecode_sdk;
        // this.basePlugin = this.dronecode_sdk.rpc[this.name];
        // this.connectService();

        return this;
    }

    connectService() {
        // const serviceClient = this.getPluginService();
        // this.service = new serviceClient(this.path, grpc.credentials.createInsecure())
    }

    getPluginService() {
        // return this.basePlugin[this.getPluginServiceName()];
    }

    getProtoPath() {
        // return `proto/protos/${this.name}/${this.name}.proto`;
      }
    
    getPluginServiceName() {
        // return this.name.charAt(0).toUpperCase() + this.name.slice(1) + 'Service';
    }
}

module.exports = Plugin;