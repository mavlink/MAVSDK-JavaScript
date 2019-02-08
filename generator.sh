#!/bin/bash
WORK_DIR="."
PROTO_DIR="${WORK_DIR}/proto/protos"
SDK_DIR="${WORK_DIR}/dronecode_sdk"
GENERATED_DIR="${WORK_DIR}/dronecode_sdk/generated"
JS_IMPORT_STYLE="commonjs"
PROTOS=`find ${PROTO_DIR} -name "*.proto" -type f`

function generateForNode {
    echo "[+] Working on: ${PROTOS}"

    grpc_tools_node_protoc \
      --js_out=import_style=commonjs,binary:$SDK_DIR \
      --grpc_out=$SDK_DIR \
      --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
      -I$PROTO_DIR \
      $PROTOS
}

function generateForWeb {
  for PROTO_FILE in $PROTOS; do
    MODULE_NAME=`echo $(basename -- ${PROTO_FILE}) | cut -f 1 -d '.'`
    OUT_DIR="${SDK_DIR}"
    echo "[+] Working on: ${MODULE_NAME}"
    echo $OUT_DIR

    protoc \
      -I$PROTO_DIR \
      --js_out=import_style=$JS_IMPORT_STYLE,binary:$OUT_DIR \
      --grpc-web_out=import_style=$JS_IMPORT_STYLE,mode=grpcwebtext:$OUT_DIR \
      $PROTO_FILE
  done
}

echo "[+] Generating plugins from "
generateForWeb
echo "[+] Done"

