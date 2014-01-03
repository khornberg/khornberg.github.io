---
layout: post
title: LightTable
tag: [lighttable, tools, help]
category: articles
---

###[LightTable](http://lighttable.com)

LightTable is a developing IDE that tries to make developing a little easier by giving live, instant feedback. That's a bit harder than it sounds. There are some good critical posts about LightTable if you search for them.

My impressions of LightTable (0.5.10) so far are:

* Seems sluggish[^1] compared to [SublimeText 3](http://sublimetext.com/3)
* No multiple cursors
* No code foldi ng

Being a developing IDE, plugin availability is nil. This will likely change.

I customized it to be a bit more like ST3. Those customizations are below.

####user.keymap

Primarily using ST3, I wanted a more familiar console toggle, toggling of comments, goto line, and clearing the console.

{% highlight clojure %}
{:+ {:app {"ctrl-`" [:toggle-console]}
    :editor {"alt-w" [:editor.watch.watch-selection]
        "alt-shift-w" [:editor.watch.unwatch]
        "ctrl-/" [:toggle-comment-selection]
        "ctrl-g" [:goto-line]
        "ctrl-shift-e" [:clear-inline-results]
        "ctrl-l" [:clear-console]}}}
{% endhighlight %}	

####user.behaviors

These are fairly generic behaviors and don't even scratch the surface of what you can change but they were the ones I wanted to change first. I wanted my lines to wrap, us the monokai theme, use the Adobe Source Code Pro font and show line numbers.

{% highlight clojure %}
:editor [:lt.objs.editor/wrap
    (:lt.objs.style/set-theme "monokai")
    (:lt.objs.style/font-settings "Source Code Pro", 11, 1.2)
    :lt.objs.editor/line-numbers]
{% endhighlight %}

####Add to Ubuntu Launcher

Copy the text below into a file named `lighttable.desktop` and place in `~/.local/share/applications`

{% highlight bash %}
[Desktop Entry]
Version=0.5
Type=Application
Name=Light Table
GenericName=Text Editor
Comment=A new interactive IDE that lets you modify running programs and embed anything from websites to games. It provides the real time feedback we need to not only answer questions about our code but to understand how our programs really work.
Exec=/opt/LightTable/LightTable %F
Terminal=false
MimeType=text/plain;
Icon=/opt/LightTable/core/img/lticon.png
Categories=TextEditor;Development;
StartupNotify=true
{% endhighlight %}

*Remember to customize the Exec and Icon paths for you machine*

[^1]: I tested LightTable using a 2010 Lenovo laptop with an Intel 2.20 GHz processor, 3GB RAM, Intel GM45 Express Chipset for graphics, and Ubuntu 13.04 32bit. Low end but works..
