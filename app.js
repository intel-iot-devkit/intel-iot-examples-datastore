"use strict";

var redis = require("./redis"),
    http = require("./http");

// get counter value
http.get("/counter/:key", function(req, res, next) {
  redis.hget("counters", req.params.key, function(err, value) {
    if (err) { return next(err); }
    res.json({ value: +value });
  });
});

// increment/create a new counter
http.get("/counter/:key/inc", function(req, res, next) {
  redis.hincrby("counters", req.params.key, 1, function(err, value) {
    if (err) { return next(err); }
    res.json({ value: value });
  });
});

// get last value from log
http.get("/logger/:key", function(req, res, next) {
  redis.lindex(req.params.key, 0, function(err, value) {
    if (err) { return next(err); }
    res.json({ value: value });
  });
});

// append value to log
http.put("/logger/:key", function(req, res, next) {
  redis.lpush(req.params.key, req.body.value, function(err, length) {
    if (err) { return next(err); }
    res.json({ value: req.body.value });
  });
});

// get all log values
http.get("/logger/:key/all", function(req, res, next) {
  redis.lrange(req.params.key, 0, -1, function(err, value) {
    if (err) { return next(err); }
    res.json({ value: value });
  });
});

// start HTTP server once connected to Redis
redis.once("ready", http.listen);
