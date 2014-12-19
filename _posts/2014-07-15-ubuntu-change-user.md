---
layout: post
title: Ubuntu Change User
date: "2014-07-15"
categories:
- articles
---

To change an Ubuntu user

1. Create a temporary user or login as root
2. sudo chfn <olduser>
	Enter in new username, press enter through the rest of the prompts
3. sudo usermod -l <newuser> <olduser>
4. Login as new user
5. Delete temporary user

I ran into issues trying to login via the unity greeter if I did not do it this way.
