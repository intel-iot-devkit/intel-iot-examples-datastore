var fs = require("fs");

PORT = (process.env.PORT || 3000);
AUTH_TOKEN = (process.env.AUTH_TOKEN || "DEFAULT_AUTH_TOKEN");
HOST = (process.env.HOST || "localhost");

function isAzure() {
  return process.env.VCAP_SERVICES;
}

function isAWS() {
  try {
    var stat = fs.statSync('/tmp/nodelist');
    if (stat.isFile()) {
      return true;
    }
    return false;
  } catch(err) {
    if (err.code == "ENOENT") {
      return false
    } else throw err;
  }
}

if (isAzure()) {
  // application is being run in MS Azure environment
  console.log("Running in MS Azure");
  PORT = process.env.VCAP_APP_PORT;
  HOST = process.env.VCAP_APP_HOST;

  var services = JSON.parse(process.env.VCAP_SERVICES);

  // look for a service starting with 'redis'
  for (var svcName in services) {
    if (svcName.match(/^redis/)) {
      var redisCreds = services[svcName][0]['credentials'];

      REDIS_URL = redisCreds.hostname;
      REDIS_OPTS = { auth_pass: redisCreds.password },
      REDIS_PORT = redisCreds.port;
    }
  }
} else if (isAWS()) {
  // application is being run in AWS Elastic Beanstalk environment
  console.log("Running in AWS Elastic Beanstalk");
  var data = fs.readFileSync('/tmp/nodelist', 'UTF8');
  if (data) {
    var lines = data.split("\n");
    if (lines && lines[0] && (lines[0].length > 0)) {
      var line = lines[0].split(":");
      REDIS_URL = line[0];
      REDIS_OPTS = {}
      REDIS_PORT = line[1];
    }
  }
} else {
  // application is being run in some other environment
  console.log("Running in other environment");
  REDIS_URL = process.env.REDIS_URL;
  REDIS_OPTS = { auth_pass: process.env.REDIS_AUTH };
  REDIS_PORT = process.env.REDIS_PORT || 6379;
}
