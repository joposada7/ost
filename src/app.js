const express = require('express');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/posadaj.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/posadaj.com/fullchain.pem')
};

const app = express();
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

exports.app = app;
