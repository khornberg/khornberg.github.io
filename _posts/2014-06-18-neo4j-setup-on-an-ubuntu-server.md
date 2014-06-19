---
layout: post
title: Neo4j Setup on an Ubuntu Server
category: articles
tags: [ubuntu, tools, database, neo4j]
---

Recently, I wanted to experiment with a graph database to store some network data. It was fairly easily to get going with one catch.

I decided to use the Vagrant base box of `ubuntu/trusty64`. So that was simple enough to download, `init` vagrant, and `vagrant up`.  
Next, follow the steps on the [Neo4j site](http://www.neo4j.org/download/linux). Those could easily be put into a script and executed by Vagrant's shell provisioner.  The last step doesn't make sense to me, since Neo4j is automatically started.  

What I cared about is accessing via a browser. So I forwarded port 7474 to my host. It should work just that easy correct? No. This is the catch.

After reading the [server configuration page](http://docs.neo4j.org/chunked/stable/server-configuration.html), I tried allowing connections from all hosts by setting `org.neo4j.server.webserver.address=0.0.0.0` in `/etc/neo4j/neo4j-server.properties`. That worked!

Also:
Your data and other things are also stored at `/var/lib/neo4j/`.
Manage the service from `/etc/init.d/neo4j-service`
