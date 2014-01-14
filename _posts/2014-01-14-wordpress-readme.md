---
layout: post
title: WordPress Readme
description: Convert markdown file to WordPress readme standard
modified: 2014-01-14
category: articles
tags: [script, wordpress, help]
---

The [WordPress readme](wordpress.org/plugins/about/readme.txt) is a "flavor" of markdown that no one else uses.

The markdown supported by most applications doesn't support WordPress markdown. So, while developing a WordPress plugin, I maintained two readmes. One for GitHub and one for WordPress. Some just leave the WordPress readme alone and push that to GitHub. That works but you lose the point of markdown: simple formatting. 

So a `sed` command was created and shared in hopes others are alleviated of having two readmes in their repositories.

<script src="https://gist.github.com/khornberg/8422787.js"></script>

It is one sed command with four regular expression substitutions.

#### Typical Usage

	./convert-readme.sh readme.md readme.txt