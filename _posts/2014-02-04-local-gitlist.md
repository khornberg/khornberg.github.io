---
layout: post
title: Local GitList
category: articles
tags: [ubuntu, tools, gitlist]
---

[GitList](http://gitlist.org) is an elegant and modern git repository viewer. I agree. How do I use it locally and not have to set up a LAMP stack?

First I'll quote Klaus to explain what GitList is and isn't and then secondly I'll explain how to get it working locally.

##What is GitList?

GitList allows you to browse repositories using your favorite browser, viewing files under different revisions, commit history and diffs. GitList is free and open source software, written in PHP, on top of Silex and the Twig template engine.

##What GitList is not:

As Klaus Silveira has responsed on GitHub to a [pull request](https://github.com/klaussilveira/gitlist/pull/306) and [issue](https://github.com/klaussilveira/gitlist/issues/300)

>GitList is not **a repository manager**. That's why there is no ability to edit files, comment on commits or edit the repository description. It's just a visualization tool, like gitk, but on the web.

And again to an [admin panel PR](https://github.com/klaussilveira/gitlist/pull/366),

>GitList aims to be the gitk, but for the web. We do, however, plan to fork the project as soon as we reach a stable version (1.0) and create a more robust version of the software, focusing on repository management, including user ACL, notifications, etc.

>In other words, we should focus on making GitList stable and very good in one thing only: viewing git repositories. After that, we can start working on more robust features, with a new project based on it's code.

GitList is at version 0.4 and moving slowly towards 1.0. So it will be a while before the other features are added.

##How do I get it to work locally?

If you have PHP 5.4+ then GitList is ready for you to use locally with minimal setup. Simply run `php -S localhost:8000 index.php` in the `gitlist` folder and open your browser to the url. That is it. Nice huh? I thought so. 

If you are on Ubuntu then the following gist has a script to do the above and a desktop file to add to your `~/.local/share/applications` folder.

<script src="https://gist.github.com/khornberg/8798074.js"></script>
