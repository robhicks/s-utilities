const liveServer = require('live-server');
const exec = require('child_process').exec;

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

exec('./node_modules/.bin/mocha-headless-chrome -f http://127.0.0.1:8001/mocha.html', (err, stdOut, stdErr) => {
  console.log("stdOut", stdOut);
  liveServer.shutdown();
  if (err) return -1;
  return 0;
});
