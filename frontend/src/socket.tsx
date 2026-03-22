"use client";

const URL = process.env.NODE_ENV == 'development' ? 'ws://localhost:8080' : 'wss://ost.posadaj.com';
console.log(`socket: attempting connection at ${URL}`);

const webSocket = new WebSocket(URL);
webSocket.addEventListener('error', (error) => {
    console.log(`socket: error ${error}`);
});
export default webSocket;