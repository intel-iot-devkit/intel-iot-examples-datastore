# intel-examples

This is a simple Azure app to provide a Redis backend for the Intel examples.

## Configuration

The following ENV vars control the app:

- **REDIS_URL** - the URL to use for Redis communication
- **REDIS_AUTH** - authentication token for Redis backend
- **PORT** - port to serve app on (defaults to `3000`)
- **AUTH_TOKEN** - authentication token for clients to use

## Routes

Two routes are made available, both with basic token auth:

- **GET /:key** - gets the value of a key
- **POST /:key** - sets a key to a value provided in POST body

To authorize, provide the AUTH_TOKEN in the `X-Auth-Token` HTTP header.
