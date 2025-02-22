const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next(1);
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  server.get('*', (req, res) => {
    return handle(req, res);
  });
});
