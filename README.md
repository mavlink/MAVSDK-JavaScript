# MAVSDK-JavaScript

JS wrapper for [mavlink/MAVSDK](https://github.com/mavlink/MAVSDK) using [grpc-web](https://github.com/grpc/grpc-web) to generate a static http client, communicating through the Envoy proxy.

__NOTE: this is still a proof of concept, don't try to use it in production!__

## Contributing

The next steps that are required are:

1. Write a nice API for some selected features (e.g. action.arm, action.takeoff, and telemetry.position) using RxJS.
2. (Optional) Make a small UI using those features (e.g. a "takeoff" button, and show the position values somewhere).
3. Write templates based on 1) to auto-generate the full API from our [proto](./proto/protos) definitions.
4. Deploy the package.

## Getting started

### Prerequisites

This project is about providing a package to write frontend JS code, but this code needs to communicate to the drone through a backend. Two components are required:

* __Envoy proxy:__ it converts the websocket messages to/from the frontend into gRPC messages sent to `mavsdk_server`.
* __mavsdk_server:__ the MAVSDK gRPC server that handles the MAVLink communication with the drone.
* (optional) __Simulator (SITL)__: which is more convenient and safer than testing on a real drone.

To help getting started, we built those components as docker micro-services. Given that you have docker and docker-compose installed, simply run the following command to start those components:

```sh
$ cd docker
$ docker-compose up
```

Once the docker containers are running, you should be able to start QGroundControl, and it should connect to the simulator (headless gazebo in this case).

### Install the SDK

Install the npm dependencies:

```sh
$ npm install
```

Generate the gRPC/protobut static files (those are the ones that will be used by the final API):

```
$ ./generator.sh
```

Finally, run the development server:

```
$ npm run build
$ npm start
```

It will say something like: _Project is running at http://localhost:8080/_. If docker-compose started correctly, opening this webpage should make the drone arm and takeoff. That would be visible from QGroundControl and from the docker-compose logs:

```
mavsdk_server_1         | [09:23:33|Debug] MAVLink: info: ARMED by Arm/Disarm component command (system_impl.cpp:306)
mavsdk_server_1         | [09:23:33|Debug] MAVLink: info: Using minimum takeoff altitude: 2.50 m (system_impl.cpp:306)
mavsdk_server_1         | [09:23:34|Debug] MAVLink: info: Takeoff detected (system_impl.cpp:306)
```
