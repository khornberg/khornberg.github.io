---
layout: post
title: CD to MP3
---

Another VLC command I found out recently.

The _in_ file extention will depend on what is on the CD. I've found .wav for Windows and .aiff for Mac. I don't know if that is always like that, just an observation.

An example
```
vlc "in.aiff" :sout='#transcode{acodec=mp3,ab=128}:std{access=file,mux=dummy,dst="file.mp3"}'
```
