---
layout: post
title: Sermon Manager Import
modified: 2013-10-14
category: articles
tags: [wordpress, help, plugin]
---

## Imports sermons into Sermon Manager using ID3 information.

[Sermon Manager Import](http://wordpress.com/plugins/sermon-manager-import/) imports sermons into [Sermon Manager for Wordpress](https://bitbucket.org/wpforchurch/sermon-manager-for-wordpress) using ID3 information. Only MP3 files are currently supported. Files can either be uploaded via the WordPress uploader or through another method. The plugin adds files to the `wp-content/uploads/sermon-manager-import` folder by default. A different folder can be specified in the options. The plugin only searches the base folder specified! Files added through the WordPress uploader will show up in the media library as unattached. The files are then attached to the sermon when imported. 

When the sermon is posted, the file is moved to the uploads folder using the organization method selected in the WordPress settings. Sermons can be posted in the `publish` or `draft` status.

**Warning** there are a few warnings you should read in the `Other Notes` section.

### Why do my uploads keep going to the sermon-manager-import folder?
While this plugin is activated, mp3 files will go to the folder specified in the `Import Options`. I recommend you activate this plugin only when needed and disable it when not needed.

### What is ID3?
[ID3](http://en.wikipedia.com/wiki/ID3) is metadata for most MP3 files. When you use a media player (e.g. iTunes, Windows Media Player, etc.) the title, artist, etc. is stored within each file in the ID3 format.

### I get a `Fatal error: Maximum execution time of 30 seconds exceededd`
Likely you are importing a lot of sermons. Refresh the page and import all of the remaining sermons again. Repeat as necessary if that doesn't do it. Your server is set to run a process for limited time. When importing many sermons, you reach this limit and the server lets you know.

### Does this work with Amazon S3 or other services?
Not sure. Please let me know.

## Contributing
If you want to contribute go to [Github](github.com), fork, and send a pull request. Issues and comments are welcome as well.

### **WARNINGS**
* All uploads identified as `audio/mp3` (usually only MP3 files) are uploaded to the import folder specified. All other files will be uploaded to the normal upload directory.  
* When posting a file that is an unattached entry, the unattached entry will be deleted. Normally, this is not an issue and is only a temporary entry. However, if you manually attached the uploaded media to a post, it will not work after importing the sermon. This is an unlikely scenario.  
* This plugin does not have the ability to add media already in the WordPress media library to sermon manager. To do this, one would manually (ssh, ftp, etc) move the files to the specified import folder. Then continue as normal. This method will delete the previous entry in the media library. If you have the media attached to another post, the old post will not work.
* While this plugin is activated, mp3 files will go to the folder specified in the `Import Options`. I recommend you activate this plugin only when needed and disable it when not needed.