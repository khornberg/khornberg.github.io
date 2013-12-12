---
layout: post
title: Git Prompt
category: articles
---

Using the `git-prompt.sh` from the git package I added the following my `.bashrc` so my prompt would be more helpful. Much of this was copied from [here](http://ithaca.arpinum.org/2013/01/02/git-prompt.html).

{% highlight bash %}
# Git prompt
if [ -f ~/Tools/bash/git-prompt.sh ]; then
    . ~/Tools/bash/git-prompt.sh
    GIT_PS1_SHOWDIRTYSTATE=true
    GIT_PS1_SHOWSTASHSTATE=true
    GIT_PS1_SHOWCOLORHINTS=true
    GIT_PS1_SHOWUNTRACKEDFILES=true
    GIT_PS1_SHOWUPSTREAM="auto git"
    PROMPT_COMMAND='__git_ps1 "\[\033[1;30m\]\u@\h\[\033[00m\]:\[\033[01; 34m\]\w\[\033[00m\]" "\\\$ "'
fi  
{% endhighlight %}

This shows your user@host in gray, the working directory in blue, and the git info colored.
