---
layout: post
title: Package Managers
category: articles
---

##How many package managers, dependency managers, or app stores do you use?

1. [apt](apt-get.org) - Advanced Package Tool
	1. deb packages
	1. [Ubuntu Software Center](apps.ubunut.com)
	1. [Synaptic](nongnu.org/synaptic) - Graphical package manager for apt
1. [Pear](pear.php.net) - PHP Extension and application repository
1. [npm](npmjs.org) - [Node](nodejs.org) packaged modules
1. [gem](rubygems.org) - "your community gem host"
1. [bower](bower.io) - "A package manager for the web"
1. [composer](getcomposer.org) - "A dependency manager for PHP"
1. [git](gitscm.com) (or any other version control system)
	1. [mr](myrepos.branchable.com) - Multiple repository manager for all those version control systems
1. [Sublime Text Package Manager](sublime.wbond.net) - How could I keep all my extensions straight?
1. [Chrome](google.com/chrome)/[Chromium](chromium.org) - App store (i.e. package manager) included

Those are the ones I thought of off the top of my head. I'm sure there are some missing.

What are are they all managing?
  
* Debian/Ubuntu OS packages  
* PHP local packages  
* PHP web packages  
* Node packages  
* Ruby packages  
* Source code  
* [Sublime Text](sublimetext.com) packages  
* Browser packages

Are those for dependency management and version control really all that different that the a package manager or app store. You want to make sure you have the latest and greatest code or binaries and you don't want it to break anything.

I'd like to have something the rules them all...probably too dangerous though.

How to update each one:

1. `apt-get update && apt-get upgrade`
2. `pear upgrade-all`
3. `composer update` Updates the php dependencies
    1. `composer selfupdate` Updates composer itself
4. `nvm update`
5. `gem update`
6. `bower update`
7. `git pull origin master`
8. `package upgrade` Type the former on the command palette and select `Package Control: Upgrade Package`
9. Chromium's automatically update
