"use client";

const URL = 'wss://ost.posadaj.com';
console.log(`socket: attempting connection at ${URL}`);

const webSocket = new WebSocket(URL);
webSocket.addEventListener('error', (error) => {
    console.log(`socket: error ${error}`);
});
export default webSocket;