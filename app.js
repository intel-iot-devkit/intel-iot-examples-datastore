"use strict";

var redis = require("./redis"),
    http = require("./http");

http.get("/:key", function(req, res, next) {
  redis.get(req.params.key, function(err, value) {
    if (err) { return next(err); }
    res.json({ value: value });
  });
});

http.post("/:key", function(req, res, next) {
  var key = req.params.key,
      value = req.body.value;

  redis.set(key, value, function(err, reply) {
    if (err) { return next(err); }
    res.json({ reply: reply });
  });
});

// start HTTP server once connected to Redis
redis.once("ready", http.listen);
