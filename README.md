# SDK-JS

JS Wrapper for [Dronecode/DronecodeSDK](https://github.com/dronecode/dronecodesdk) using [grpc-web](https://github.com/grpc/grpc-web) to generate static http client compatible with Envoy Proxy

# Work in Progress

# Install

Install npm deps

```
npm install
```

Generate gRPC/Proto static files
```
./generator.sh
```

Run dev server

```
npm start
```

# Connecting to backend
TODO

* Run PX4 SITL
* Run Backend
* Configure envoy (yaml) to talk to backend
* Run Envoy proxy (using docker)
