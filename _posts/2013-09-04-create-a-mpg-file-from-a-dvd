###Steps
1. Copy the VIDEO_TS folder from the DVD to your hard drive
2. For each `.VOB` file run this command `vlc FILE --sout-keep --sout='#transcode{vcodec=h264, acodec=mpga}:std{access=file, mux=ps,dst=file2.mpg}'`[^1]
3. Run this command once replacing FILES with the name of each file you want to add together `vlc FILES vlc://quit --sout-file-append --sout=file/ps:all.mpg`[^2]

This really only works for a small number of files. Footnote 2 has an example to combine the gather command and transcode. Beware that the timeings will be off with either the gather or --sout-file-append command. By timings I mean that when you play the file the bar at the bottom of your player will not show the correct time.

[^1]: [Transcode example and more information](https://wiki.videolan.org/MPEG/)

[^2]: https://wiki.videolan.org/How_to_Merge_and_Transcode_Multiple_Videos/
