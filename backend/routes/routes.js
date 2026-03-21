require('module-alias/register');
const fs = require('fs');
const express = require('express');

// Declare env and routers
const router = express();

// Set routing
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
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000 http://localhost:8080');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    // Listen on 8080
    const PORT = process.env.PORT || 8080;
    const webServer = require('http').createServer(router);
    const socketServer = require('@socket/socket.js').server(webServer);
    webServer.listen(PORT, () => {
        console.log(`> Running development node.js backend on port ${PORT}`);
        console.log(`> Local:     http://localhost:${PORT}`);
    });
}