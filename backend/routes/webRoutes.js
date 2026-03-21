const express = require('express');
const path = require('path');
const axios = require('axios');

const INTERNAL_HOSTNAME = process.env.INTERNAL_HOSTNAME || 'localhost';
const FRONTEND_TIMEOUT = process.env.FRONTEND_TIMEOUT || 0;

// Serve static assets
const router = express();
router.use('/favicon.ico', (req, res, next) => {
  res.send('');
});
router.use('/_next', express.static(path.resolve('/app/.next'), {index: false, extensions: [ 'js', 'css', 'png']}));
router.use(express.static(path.resolve('/app/public')));

// Request from frontend
router.use((req, res, next) => {
  axios({
    method: req.method,
    url: path.join(`http://${INTERNAL_HOSTNAME}:3000`, req.url),
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
});

module.exports.router = router;