---
layout: post
title: Enabling Apache modules in `dockerfile/php`
date: "2015-05-11"
categories:
  - articles
---

If you use the base image of PHP which has Apache on it already you'll probably want `rewrite` and/or other modules enabled.

Using either `docker-enter` or `docker exec` you can enable it without writing a seperate dockerfile or other things.

For example:

    docker run -it --name web-app -p 80:80 --link mysql:database php:5.6-apache

I named the container and made it persitant.

Using `docker exec` while it is running

    docker exec api a2enmod rewrite
    docker exec api service apache2 restart

The container will automatically loose it's tty but that is okay. It is still running. If it is not you can restart it and the modification will still be there.

You can interact with it by attaching a tty.

    docker start -ai web-app

Once `rewrite` is enabled, you can save the image and use it for other thing without going through the steps again.
