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

// Start listening on backend
const http = require('http');
const port = process.env.PORT || 8080;
http.createServer(router).listen(port, () => {
    console.log(`Listening on port ${port}`);
});
