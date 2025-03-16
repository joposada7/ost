const express = require('express');
const path = require('path');
const axios = require('axios');

// Get extension function
function getExt(p) {
    var a = p.split('.');
    if (a.length === 1 || (a[0] == '' && a.length === 2)) {
        // No extension found
        return '';
    } else {
        // Found extension
        return a.pop();
    }
}

const DOCKER_HOSTNAME = process.env.DOCKER_HOSTNAME || 'localhost';
const FRONTEND_TIMEOUT = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_TIMEOUT : 0;
const router = express();

router.use((req, res, next) => {
    const ext = getExt(req.url);
    if (ext && !(ext === 'js')) {
        // Serve static asset
        next();
    } else {
        // Request from frontend
        axios({
          method: req.method,
          url: path.join(`http://${DOCKER_HOSTNAME}:3000`, req.url),
          headers: req.headers,
          params: req.params,
          data: req.data,
          timeout: FRONTEND_TIMEOUT
        }).then(response => {
          res.status(response.status).header(response.headers).end(response.data);
        }).catch(err => {
          console.log(`${err.message} trying to access ${req.url}`);
          res.status(500).send(err.message);
        });
    }
});

// Serve static assets
const nextDir = path.resolve('/app/.next');
const publicDir = path.resolve('/app/public');
router.use('/_next', express.static(nextDir));
router.use(express.static(publicDir));

module.exports.router = router;
