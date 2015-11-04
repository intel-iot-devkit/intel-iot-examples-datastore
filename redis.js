"use strict";

/* eslint camelcase: 0 */

var redis = require("redis");

var REDIS_URL = process.env.REDIS_URL,
    REDIS_OPTS = { auth_pass: process.env.REDIS_AUTH },
    REDIS_PORT = process.env.REDIS_URL || 6379;

// check if application is being run in IBM Bluemix environment
if (process.env.VCAP_SERVICES) {
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
}

var client = redis.createClient(REDIS_PORT, REDIS_URL, REDIS_OPTS);

client.once("ready", function() { console.log("connected to redis"); });
client.on("error", function(err) { console.error("err:", err); });

module.exports = client;
