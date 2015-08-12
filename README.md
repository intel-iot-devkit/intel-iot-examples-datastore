# intel-examples

This is a simple Azure app to provide a Redis backend for the Intel examples.

## Configuration

The following ENV vars control the app:

- **REDIS_URL** - the URL to use for Redis communication
- **REDIS_AUTH** - authentication token for Redis backend
- **PORT** - port to serve app on (defaults to `3000`)
- **AUTH_TOKEN** - authentication token for clients to use

## Routes

Two sets of routes are made available, both with basic token auth.

To authorize, provide the AUTH_TOKEN in the `X-Auth-Token` HTTP header.

#### Counter

The counter routes are used to increment an increasing counter.

- **GET /counter/:key** - gets the current value of a counter
- **GET /counter/:key/inc** - increments a counter by 1

#### Logger

The logger routes wrap redis lists, and are used to keep a linear backlog of values.

- **GET /logger/:key** - gets the latest value of a log
- **PUT /logger/:key** - adds a value to a log (`value` param in POST body)
- **GET /logger/:key/all** - returns all values of a log
