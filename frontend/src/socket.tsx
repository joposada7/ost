"use client";

import { io } from "socket.io-client";

const DOCKER_HOSTNAME = process.env.NEXT_PUBLIC_DOCKER_HOSTNAME || "localhost";
const URL = `http://${DOCKER_HOSTNAME}:8080`;

console.log(`attempting to connect to socket at: ${URL}`);
export const webSocket = io(URL, {
    transports: ['websocket', 'polling'],
});