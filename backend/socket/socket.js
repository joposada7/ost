const ws = require('ws');

// createSocketServer is a function that takes a webServer to latch to and returns
// the associated WebSocketServer object. Imported on the nodejs server and latched to
// the webServer listening on 443/80.
const createSocketServer = (webServer) => {
    const wss = new ws.WebSocketServer({
        server: webServer,
        clientTracking: true,
    });

    // Log connection
    wss.on('connection', (socket) => {
        socket.on('error', (err) => {
            console.log(`socket: error caught in socket.js ${err}`);
        });
        console.log('socket: connected to client');

        socket.on('message', (data) => {
            console.log(`socket: received client data: ${data}`);
        });
    });
    return wss
};

module.exports.createSocketServer = createSocketServer;