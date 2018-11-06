# Xen REST API

This is a dead-simple NodeJS application that show list of
**Xen** DomU available on a specific node. It is intended to
be launched internally only (no security yet!) and give a JSON
output.

# How to dev on it ?

```
npm install
npm run devstart
```

Go to http://localhost:3001/api

# Run tests ?

```
npm test
```

# Deploy ?

The user that is running the NodeJs app must be able to run the ``xen list``
command and list files under `/etc/xen``.