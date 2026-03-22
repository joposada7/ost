"use client";

const INTERNAL_HOSTNAME = process.env.INTERNAL_HOSTNAME || 'ost.posadaj.com';
const wsProtocol = process.env.NODE_ENV == 'development' ? 'ws' : 'wss';
const URL = `${wsProtocol}://${INTERNAL_HOSTNAME}`;
console.log(`socket: attempting connection at ${URL}`);

const webSocket = new WebSocket(URL);
webSocket.addEventListener('error', (error) => {
    console.log(`socket: error ${error}`);
});
export default webSocket;