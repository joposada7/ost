require('module-alias/register');
const fs = require('fs');
const express = require('express');

// Declare env and routers
const DOCKER_HOSTNAME = process.env.NEXT_PUBLIC_DOCKER_HOSTNAME || 'localhost';
const router = express();
const webRoutes = require('@routes/webRoutes.js');

// CORS header
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `http://localhost:3000 http://${DOCKER_HOSTNAME}:3000 http://localhost:8080 http://${DOCKER_HOSTNAME}:8080`);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Set routing
router.use((req, res, next) => {
    console.log(`routes: got protocol ${req.protocol} for url ${req.url}`);
    next();
})
router.use('/', webRoutes.router);

// No response anywhere, send 404
router.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.send('Not found');
    } else if (req.accepts('json')) {
        res.json({ error: 'Not found' }).end();
    } else {
        res.type('txt').send('Not found').end();
    }
});

// Setup web server
const webServer = require('http').createServer(router);

// Setup websocket server
const socketServer = require('@socket/socket.js').server(webServer);

// Start listening on backend
const PORT = process.env.PORT || 8080;
webServer.listen(PORT, () => {
    console.log(`> Running node.js backend on port ${PORT}`);
    console.log(`> Local:     http://localhost:${PORT}`);
    console.log(`> Network:   http://${DOCKER_HOSTNAME}:${PORT}`);
});
