---
layout: post
title: Linux Simplenote?
date: "2015-01-21"
categories:
  - articles
---

I like the simplicity of Simplenote and the clean UI of Notational Velocity / [nvALT](http://brettterpstra.com/projects/nvalt/). I would use them, however, I don't use OS X. 

I use Linux. What does a Linux user do?

There is [nvPY](https://github.com/cpbotha/nvpy) for Linux but as the author states, it is ugly. Not bad, just not pretty. I would like pretty as well. I'm not sure why, just do. I would also like to have markdown rendered in the same window as the text (e.g. Simplenote web, Springseed). 

[Springseed](http://getspringseed.com/) seems promising though the development seems a bit closed and slow. There doesn't seem to be much communication. Not everyone open source project needs to be. I'm also a bit concerned about the direction of the application because of code in the master referring to the Springseed API. Maybe it will connect to some backend servers that will connected to all kinds of things. It is also kind of buggy from my reading of the issues and experiences.

[Matt Mullenweg](http://ma.tt/2014/08/simplenote-for-linux/) asked about a Simplenote client for Linux. He got a few comments but I cannot find anything since that question about his plan. 

[Requests for Simplenote integration have been made to Springseed](https://github.com/byhestia/springseed/issues/139)  and nvPY hasn't had anyone submit a pull request for a Gtk3 theme or anything else to make it pretty. the nvPY author is also looking for a new maintainer.

I want the Linux Simplenote application to be fast, simple, and pretty. 
I want it to render markdown in the same window as I write like the web application.

Developed well, it will be extensible and able to be hacked on by others quickly allowing many different integrations.

### Other features:

* I like the idea of notes being stored locally and then sync'ed remotely. 
* Inter-note linking
* Clickable links within a note
* Easily import notes from other note applications that I've tried and didn't like. This works around the [simplenote-import tool not working](http://help.simplenote.com/customer/portal/questions/8349691-is-importing-broken-)

### It seems like there are several options:

* Prettify nvPY - a bit of work to do with Qt or Gtk  
* Hack on Springseed - I don't know how receptive the project is to external contributions  
* Create another competting option - Recreating the wheel and yet provides opportunity for reuse of the web ecosystem  
* Wait for Simplenote to release one - What do I use now?  nvPY I suppose...
