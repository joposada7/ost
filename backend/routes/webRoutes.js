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

const FRONTEND_HOST = process.env.FRONTEND_HOST || 'localhost';
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
          url: path.join(`http://${FRONTEND_HOST}:3000`, req.url),
          headers: req.headers,
          params: req.params,
          data: req.data,
          timeout: 200
        }).then(response => {
          res.status(response.status).header(response.headers).end(response.data);
        }).catch(err => {
          console.log(`${err.message} trying to access ${req.url}`);
          res.status(err.status).send(err.message);
        });
    }
});

// Serve static assets
const nextDir = path.resolve('/app/.next');
const publicDir = path.resolve('/app/public');
router.use('/_next', express.static(nextDir));
router.use(express.static(publicDir));

module.exports.router = router;
