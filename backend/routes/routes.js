require('module-alias/register');
const fs = require('fs');
const express = require('express');

const INTERNAL_HOSTNAME = process.env.INTERNAL_HOSTNAME || 'localhost';

// Set routing
const router = express();
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `http://${INTERNAL_HOSTNAME}:3000 http://${INTERNAL_HOSTNAME}:8080`);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
router.use('/', require('@routes/webRoutes.js').router);

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

module.exports.router = router;

// Setup development web server
if (process.env.NODE_ENV == 'development') {
    // Listen on 8080
    const PORT = process.env.PORT || 8080;
    const webServer = require('http').createServer(router);
    const socketServer = require('@socket/socket.js').server(webServer);
    webServer.listen(PORT, () => {
        console.log(`>   Running development node.js backend on port ${PORT}`);
        console.log(`>   Connect via http://localhost:3000`);
    });

    ws = require('ws');
    function pingSockets() {
        socketServer.clients.forEach((client) => {
            now = new Date();
            if (client.readyState == ws.OPEN) {
                client.send(`Hello from the local world! Unix epoch: ${now.getTime()}`);
            }
        });
    }
    setInterval(pingSockets, 5000);
}