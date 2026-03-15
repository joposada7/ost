const socketio = require('socket.io');

// Declare env
const DOCKER_HOSTNAME = process.env.NEXT_PUBLIC_DOCKER_HOSTNAME || 'localhost';

// Set up websocket
const socketServer = (webServer) => {
    server = new socketio.Server(webServer, {
        transports: ['websocket', 'polling'],
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:8080', `http://${DOCKER_HOSTNAME}:3000`, `http://${DOCKER_HOSTNAME}:8080`, 'https://ost.posadaj.com', 'https://ost.posadaj.com:*'],
        },
    });
    
    server.on('connection', (socket) => {
        console.log(`socket: connected with id ${socket.id}`);

        socket.conn.once('upgrade', () => {
            console.log(`socket: transport upgraded to ${socket.conn.transport.name}`);
            console.log(`socket: client requested from '${socket.client.request.origin}'`);
        });
        
        socket.on('disconnect', (reason) => {
            console.log(`socket: connection with id ${socket.id} closed with reason '${reason}'`);
        });
        
        // Emit a single message to the client on connection
        console.log(`socket: transmitting message`);
        server.emit('message', {
            data: 'hello from the server!',
        });
    });

    return server;
}

module.exports.server = socketServer;