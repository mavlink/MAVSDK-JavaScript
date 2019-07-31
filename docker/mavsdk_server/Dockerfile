FROM ubuntu:18.04

RUN apt-get update && \
    apt-get install -y curl

RUN curl -L https://github.com/mavlink/MAVSDK/releases/download/v0.18.3/mavsdk_server_manylinux1-x64 -o /root/mavsdk_server

RUN chmod +x /root/mavsdk_server

ENTRYPOINT /root/mavsdk_server
