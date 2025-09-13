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

const DOCKER_HOSTNAME = process.env.NEXT_PUBLIC_DOCKER_HOSTNAME || 'localhost';
const FRONTEND_TIMEOUT = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_TIMEOUT : 0;
const router = express();

// Serve static assets
router.use('/_next', express.static(path.resolve('/app/.next'), {index: false, extensions: [ 'js', 'css', 'png']}));
router.use(express.static(path.resolve('/app/public')));

// Request from frontend
router.use((req, res, next) => {
  axios({
    method: req.method,
    url: path.join(`http://${DOCKER_HOSTNAME}:3000`, req.url),
    headers: req.headers,
    params: req.params,
    data: req.data,
    timeout: FRONTEND_TIMEOUT

  }).then(response => {
    // Got response
    res.status(response.status).header(response.headers).end(response.data);

  }).catch(err => {
    // Got error
    console.log(`${err.message} trying to access ${req.url}`);
    res.status(500).send(err.message);
  });
});

module.exports.router = router;