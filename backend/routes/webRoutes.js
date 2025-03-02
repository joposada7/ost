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

const router = express();
router.use((req, res, next) => {
    const ext = getExt(req.url);
    if (ext && !(ext === 'js')) {
        // Serve static asset from public
        next();
    } else {
        // Request from frontend
        axios.get(path.join(`http://host.docker.internal:3000`, req.url))
          .then(response => {
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            res.status(200).header(response.headers).end(response.data);
          })
          .catch(err => {
            if (!err.request && !err.response) {
                console.log(`${err.message} trying to access ${req.url}`);
                res.status(500).send('Connection refused');
            } else {
                console.log(`${err.message} trying to access ${req.url}`);
                next();
            }
          });
    }
});

// Serve static assets
const publicDir = path.join(__dirname, '..', '..', 'frontend', 'public');
const nextDir = path.join(__dirname, '..', '..', 'frontend', '.next');
router.use(express.static(publicDir));
router.use('/_next', express.static(nextDir));

module.exports.router = router;