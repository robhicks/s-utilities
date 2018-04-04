const liveServer = require('live-server');

const params = {
  port: 8001,
  host: "0.0.0.0",
  file: 'mocha.html',
  mount: [['/dist', './dist'], ['/src', './src'], ['/node_modules', './node_modules']],
  open: false,
  wait: 500,
  logLevel: 2
};

liveServer.start(params);
