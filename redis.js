"use strict";

/* eslint camelcase: 0 */

var redis = require("redis");
var client = redis.createClient(REDIS_PORT, REDIS_URL, REDIS_OPTS);

client.once("ready", function() { console.log("connected to redis"); });
client.on("error", function(err) { console.error("err:", err); });

module.exports = client;
