require('module-alias/register');
const express = require('express');

// Declare router
const router = express();

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

// Set up websocket
const server = require('http').createServer(router);
const io = require('socket.io')(server, {});
io.on('connection', (socket) => {
    console.log('Connected');

    socket.conn.once('upgrade', () => {
        console.log(`Transport upgraded to ${socket.conn.transport.name}`);
    })

    socket.on('message', (message) => {
        console.log(`Got message: ${message}`);
        io.emit('message', `There was a message ${message}`);
    })

    socket.conn.on('close', (reason) => {
        console.log(`Connection closed: ${reason}`);
    })
})

// Start listening on backend
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
