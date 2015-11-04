"use strict";

/* eslint no-unused-vars: 0 */

var PORT = (process.env.VCAP_APP_PORT || process.env.PORT || 3000),
    AUTH_TOKEN = (process.env.AUTH_TOKEN || "DEFAULT_AUTH_TOKEN"),
    HOST = (process.env.VCAP_APP_HOST || process.env.HOST || "localhost");

var app = require("express")();

var bodyParser = require("body-parser");

// parse POST bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// content-type
app.use(function(req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

// auth
app.use(function(req, res, next) {
  var header = req.header("X-Auth-Token");
  if (header && header === AUTH_TOKEN) { return next(); }
  return res.status(401).json({ error: "unauthorized" });
});

function listen() {
  // 404
  app.use(function(req, res, next) {
    res.status(404).json({ error: "not found" });
  });

  // error handler
  app.use(function(err, req, res, next) {
    res.status(500).json({ error: err });
  });

  // start
  app.listen(PORT, HOST, function() {
    console.log("http server at", HOST, "listening on port", PORT);
  });
}

module.exports = {
  get: app.get.bind(app),
  put: app.put.bind(app),
  post: app.post.bind(app),
  listen: listen
};
