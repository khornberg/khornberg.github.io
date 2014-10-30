---
layout: post
title: Changing Docker's IP Address
tag: [docker, tools]
category: articles
---

# Changing Docker's IP Address

I installed docker to do some experiments the other day. Everything worked find and dandy until one day I needed to connect to a server in the 172.17.0.0 range. I got some weird results. After talking with a colleague, he noted the docker0 bridge. Exactly.

If you have internal addresses that are in the default `172.17.0.0/16` range, you'll have some routing troubles. 

This is a guide to change docker's ip address without restarting the whole machine. [This blog was helpful](http://blog.tremily.us/posts/Docker/) regarding the bridge.

## Defaults

Docker creates a bridge called `docker0` with a default ip address of `172.17.42.1`.

On Ubuntu the configuration file is at `/etc/default/docker.io`.  
On CentOS the configuration file is at `/etc/sysconfig/docker`.  

## Edit the docker options

Change `#DOCKER_OPTS="--dns 8.8.8.8 --dns 8.8.4.4"` to `DOCKER_OPTS="--bip=10.11.12.1/24"`

You telling docker to use a bridge ip of 10.11.12.1. You can choose anything you want. You'll need to make sure your CIDR notation is correct. Otherwise docker will revert to the default.

## Stop Docker

Yes, you have to stop docker for this. (All my running containers were messed up after doing this, so you'll want to do something about that. I was doing this in lab/test environment so it didn't matter that I had to destroy my containers and start over.)

`service docker.io stop`

## Install bridge-utils

Ubuntu doesn't have the bridge-utils package to delete the `docker0` bridge, so install that.

`sudo apt-get install bridge-utils`

CentOS does so nothing to install on there.

## Shutdown the bridge

`ip link set dev docker0 down`

## Delete the bridge

`brctl delbr docker0`

## Start docker

`service docker.io start`

You can then check the ip address with a `ifconfig`. The `docker0` bridge should have the new ip address.
