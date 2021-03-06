#!/bin/bash

set -e

WORK_DIR="./src"
PROTO_DIR="proto/protos"
SDK_DIR="${WORK_DIR}/mavsdk"
JS_IMPORT_STYLE="commonjs"
PROTOS=`find ${PROTO_DIR} -name "*.proto" -type f`
PATH=$PATH:./node_modules/.bin/

command -v protoc-gen-grpc-web >/dev/null 2>&1 || { echo "ERROR: 'protoc-gen-grpc-web' is required (find it here: https://github.com/grpc/grpc-web/releases)!"; echo "You can also install the package globally with 'npm install -g protoc-gen-grpc-web'" exit 1; }

function generateForNode {
    echo "  [+] Working on: ${PROTOS}"

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
    echo "  [+] Working on: ${MODULE_NAME}"

    protoc \
      -I$PROTO_DIR \
      --js_out=import_style=$JS_IMPORT_STYLE,binary:$SDK_DIR \
      --grpc-web_out=import_style=$JS_IMPORT_STYLE,mode=grpcwebtext:$SDK_DIR \
      $PROTO_FILE
  done

  # We need to add eslint-disable, otherwise create-react-app doesn't work with
  # this, see:
  # https://github.com/improbable-eng/grpc-web/issues/96#issuecomment-347871452
  for f in "${SDK_DIR}"/*/*_pb.js
  do
    echo '/* eslint-disable */' | cat - "${f}" > temp && mv temp "${f}"
  done

  for f in "${SDK_DIR}"/*_pb.js
  do
    echo '/* eslint-disable */' | cat - "${f}" > temp && mv temp "${f}"
  done
}

echo "[+] Generating plugins for grpc-web "
generateForWeb
echo "[+] Done"
