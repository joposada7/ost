"use client";

import { io } from "socket.io-client";

const DOCKER_HOSTNAME = process.env.NEXT_PUBLIC_DOCKER_HOSTNAME;
const URL = process.env.NODE_ENV === "production" ? undefined : `http://${DOCKER_HOSTNAME}:8080`

console.log(`attempting to connect to socket at: ${URL}`);
export const webSocket = io(URL, {
    transports: ['websocket', 'polling'],
});