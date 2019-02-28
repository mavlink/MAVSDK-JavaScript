
/*
 *
 proto/protos/gimbal/gimbal.proto
 proto/protos/core/core.proto
 proto/protos/calibration/calibration.proto
 proto/protos/camera/camera.proto
 proto/protos/discovery/discovery.proto
 proto/protos/mission/mission.proto
 proto/protos/info/info.proto
 proto/protos/action/action.proto
 proto/protos/telemetry/telemetry.proto
 */
const gimbal_pb = require('gimbal/gimbal_pb.js');
const gimbal_grpc_web_pb = require('gimbal/gimbal_grpc_web_pb.js');

module.exports = {
  gimbal_pb,
  gimbal_grpc_web_pb,
}
