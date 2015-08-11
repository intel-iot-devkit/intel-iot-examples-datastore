"use strict";

/* eslint camelcase: 0 */

var redis = require("redis");

var REDIS_URL = process.env.REDIS_URL,
    REDIS_OPTS = { auth_pass: process.env.REDIS_AUTH };

var client = redis.createClient(6379, REDIS_URL, REDIS_OPTS);

client.once("ready", function() { console.log("connected to redis"); });
client.on("error", function(err) { console.error("err:", err); });

module.exports = client;
