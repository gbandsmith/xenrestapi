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
command and list files under ``/etc/xen``.

Here is how to deploy on a Debian 7.x server. Can be adapted to run on any Debian
you can just adapt the NodeJS version (latest is better)

## Install NodeJS

    # Using Debian, as root
    curl -sL https://deb.nodesource.com/setup_6.x | bash -
    apt-get install -y nodejs

## Install PM2

[PM2](http://pm2.keymetrics.io/) is a process manager for NodeJS

    sudo npm install pm2 -g
    # PM2 will boot at startup
    pm2 startup

## Pull the project and run it via PM2

    git clone https://github.com/gbandsmith/xenrestapi.git
    pm2 start xenrestapi/bin/www --name xenrestapi
    pm2 save