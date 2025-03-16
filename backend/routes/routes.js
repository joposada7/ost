require('module-alias/register');
const express = require('express');

// Declare router
const router = express();

// CORS header
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `http://localhost:3000 http://${DOCKER_HOSTNAME}:3000`);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Route
const webRoutes = require('@routes/webRoutes.js').router;
router.use('/', webRoutes);

// No response anywhere, send 404
router.use((req, res, next) => {
    res.status(404);
    if (req.accepts('html')) {
        res.send('Not found');
    } else if (req.accepts('json')) {
        res.json({ error: 'Not found' }).end();
    } else {
        res.type('txt').send('Not found').end();
    }
});

const DOCKER_HOSTNAME = process.env.DOCKER_HOSTNAME || 'localhost';
const server = require('http').createServer(router);
const socketio = require('socket.io');

// Set up websocket
const io = new socketio.Server(server, {
    transports: ['websocket', 'polling'],
    cors: {
        origin: [`http://${DOCKER_HOSTNAME}:3000`],
    },
});
io.on('connection', (socket) => {
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
    io.emit('message', {
        data: 'hello from the server!',
    });
});

// Start listening on backend
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`> Running node.js backend on port ${PORT}`);
    console.log(`> Local:     http://localhost:${PORT}`);
    console.log(`> Network:   http://${DOCKER_HOSTNAME}:${PORT}`);
});
