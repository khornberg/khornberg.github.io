---
layout: post
title: Clone to Edit in Cloud 9
category: articles
---

I use AdBlock+ and Ghostery. Cloud 9 why won't you work with me? 

Just recently I went to clone a github project. After clicking the `Clone to edit` button, the URL was blank. After searching their FAQs (first one listed and highlighted) was the fact that Ghostery blocks the IDE.

Ghostery picked up four things to block, Gravatar, Optimizely, Segment.io, and Twitter Button. 

I disabled AdBlock+ and Ghostery and sure enough it worked. I figured out by the process-of-elimination that AdBlock+ must be paused and Optimizely my be allowed in Ghostery. I'm not sure why.

Looking at the description of Optimizely, it seems somewhat benign and I understand that Cloud 9 wants to know how the users are using the application. I have no problem enabling it. I don't understand why the URL is blocked because of it.