---
layout: post
title: Saving a Docker Image
date: "2014-12-19 13:57"
categories:
  - articles
---

I wanted to saving a docker image built on my laptop and upload it to a server with limited connectivity to the outside world.

How does one do that? See the command below. It is yet another four commands.

```
docker build -t <imagename> .
docker save <imagename> > <imagename>.tar
//Move image to server. I used scp.
docker load -i <imagename>.tar
```
