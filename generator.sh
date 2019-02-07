#!/bin/bash
WORK_DIR="."
PROTO_DIR="${WORK_DIR}/proto/protos"
SDK_DIR="${WORK_DIR}/dronecode_sdk"
GENERATED_DIR="${WORK_DIR}/dronecode_sdk/generated"

function generate_all {
    PROTOS=`find ${PROTO_DIR} -name "*.proto" -type f`
    echo "[+] Working on: ${PROTOS}"

    grpc_tools_node_protoc \
      --js_out=import_style=commonjs,binary:$SDK_DIR \
      --grpc_out=$SDK_DIR \
      --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
      -I$PROTO_DIR \
      $PROTOS

}

function generate {
    echo "[+] Working on dir: ${PROTO_DIR}"

    for PROTO_FILE in `find ${PROTO_DIR} -name "*.proto" -type f`; do

        FILE_NAME=`basename $PROTO_FILE`
        MODULE_NAME=${FILE_NAME/\.proto/}

        # Generate bindings for each file individually
        #pbjs -t static-module \
          #--plugin=protoc-gen-grpc-web=$(which protoc-gen-grpc-web)\
          #-p $PROTO_DIR\
          #-o $GENERATED_DIR/$MODULE_NAME.js\
          #--es6 \
          #$PROTO_FILE

        grpc_tools_node_protoc \
          --js_out=import_style=commonjs \
          --grpc_out=$SDK_DIR \
          --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
          $PROTO_FILE
        echo " -> [+] Generated ${MODULE_NAME}.js"


    done
}

echo "[+] Generating plugins from "
generate_all
echo "[+] Done"

