#!/bin/bash
WORK_DIR="./src"
PROTO_DIR="proto/protos"
SDK_DIR="${WORK_DIR}/dronecode_sdk"
OUT_DIR="${WORK_DIR}/generated"
JS_IMPORT_STYLE="commonjs"
PROTOS=`find ${PROTO_DIR} -name "*.proto" -type f`

function generate {
  for PROTO_FILE in $PROTOS; do
    MODULE_NAME=`echo $(basename -- ${PROTO_FILE}) | cut -f 1 -d '.'`
    echo "[+] Working on: ${MODULE_NAME}"

    protoc \
      -I$PROTO_DIR \
      --js_out=import_style=commonjs,binary:$OUT_DIR \
      --grpc-web_out=import_style=$JS_IMPORT_STYLE,mode=grpcwebtext:$OUT_DIR \
      $PROTO_FILE
  done
}

echo "[+] Generating plugins from "
generate
echo "[+] Done"

