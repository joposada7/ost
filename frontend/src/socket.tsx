"use client";

const INTERNAL_HOSTNAME = process.env.INTERNAL_HOSTNAME || 'localhost';
// const URL = `wss://${INTERNAL_HOSTNAME}:8080`;
const URL = 'ws://localhost:8080';
console.log(`socket: attempting connection at ${URL}`);

const webSocket = new WebSocket(URL);
webSocket.addEventListener('error', (error) => {
    console.log(`socket: error ${error}`);
});
export default webSocket;