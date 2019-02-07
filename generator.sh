#!/bin/bash
WORK_DIR="."
PROTO_DIR="${WORK_DIR}/proto/protos"
SDK_DIR="${WORK_DIR}/dronecode_sdk"
GENERATED_DIR="${WORK_DIR}/dronecode_sdk/generated"

function generate {
    PROTOS=`find ${PROTO_DIR} -name "*.proto" -type f`
    echo "[+] Working on: ${PROTOS}"

    grpc_tools_node_protoc \
      --js_out=import_style=commonjs,binary:$SDK_DIR \
      --grpc_out=$SDK_DIR \
      --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
      -I$PROTO_DIR \
      $PROTOS

}

echo "[+] Generating plugins from "
generate
echo "[+] Done"

