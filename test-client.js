const grpc = require('grpc');
const telemetryMessages = require('./dronecode_sdk/telemetry/telemetry_pb');
const telemetryServices = require('./dronecode_sdk/telemetry/telemetry_grpc_pb');

const actionMessages = require('./dronecode_sdk/action/action_pb');
const actionServices = require('./dronecode_sdk/action/action_grpc_pb');

console.log("[+] started");

const telemetryServiceClient = new telemetryServices.TelemetryServiceClient('localhost:50051', grpc.credentials.createInsecure());
const actionServiceClient = new actionServices.ActionServiceClient('localhost:50051', grpc.credentials.createInsecure());

const armSubscribeRequest = new telemetryMessages.SubscribeArmedRequest();
const posRequest = new telemetryMessages.SubscribePositionRequest();

const timeout = (new Date().getTime()) + (5 * 1000); // 5 seconds in ms
telemetryServiceClient.waitForReady(timeout, (error, data) => {
  const stateId = telemetryServiceClient.getChannel().getConnectivityState();
  const stateStr = Object.keys(grpc.connectivityState).find(key => grpc.connectivityState[key] === stateId)
  console.log(`Telemetry Service State: ${stateStr}`);
  if (error) {
    console.log('tele error');
    if (stateId !== grpc.connectivityState.READY) {
      throw error;
    }
  }

  telemetryServiceClient.subscribeArmed(armSubscribeRequest, (error, response) => {
    if (error){
      console.log('[-] error');
      console.log(error);
    }
    console.log('[+] armed?');
    console.log(response);
  });

  telemetryServiceClient.subscribePosition(posRequest, (error, response) => {
    if (error){
      throw error;
    }
    console.log('[+] subscribePosition?');
    console.log(response);
  });
});


const armRequest = new actionMessages.ArmRequest();
const takeoffRequest = new actionMessages.TakeoffRequest();

actionServiceClient.arm(armRequest, (error, response) => {
  if (error) {
    throw error;
  }
  const armResult = response.getActionResult().getResult();
  const armResponse = response.getActionResult().getResultStr();
  console.log(`[+] arm: ${armResponse}`);
  if (armResult === 1) {
    actionServiceClient.takeoff(takeoffRequest, (err, res) => {
      if (err) {
        throw err;
      }
      const takeoffResult = res.getActionResult().getResult();
      const takeoffResponse = res.getActionResult().getResultStr();
      console.log(`[+] takeoff: ${takeoffResponse}`);
      if (takeoffResult === 1) {
        console.log('[+] --- end ---');
      }
    });
  }
});

console.log("[+] ended");

