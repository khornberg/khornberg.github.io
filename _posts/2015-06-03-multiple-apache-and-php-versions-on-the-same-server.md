---
layout: post
title: Multiple Apache and PHP Versions on the Same Server
categories: ['articles']
tags: ['apache', 'php']
published: True

---

Are you upgrading an application that use Apache 2.2 and PHP 5.old?

You can do so on the same server without impacts to the old application. 

The caveats upfront: 
* you need to settle for different ports than the standard ones if those are already in use
* I don't remember where I got all the files from...
* the files are not posted here

I have only done this on RHEL. See how to enable [PHP 5.4](http://developerblog.redhat.com/2013/08/01/php-5-4-on-rhel-6-using-rhscl/) and [a method to run multiple apache and php instances](http://developerblog.redhat.com/2014/04/08/apache-with-various-php-versions-using-scl/).

I didn't want to use fpm. 

The great thing about how rhscl installs both httpd24 and php55 is that they are self contained.

You do not have to enable php system wide as the previous article states. Find libphp55-php5.so on the web such as from this [RPM](http://rpm.pbone.net/index.php3/stat/4/idpl/26630836/dir/scientific_linux_6/com/php55-php-5.5.6-10.el6.x86_64.rpm.html).

Then put that at `/opt/rh/httpd24/root/usr/lib64/httpd/modules/libphp55-php5.so`.

In fact that RPM probably works to install php55 though I don't remember if that is what I did.

`libphp55-php5.so` is the key. Everything else is a conf file that you'll be able to pull or use from another system.

