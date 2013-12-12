---
layout: post
title: GitHub Pages from Yeoman
category: articles
---

Using a base Yeoman workflow, one can create a GitHub project page fairly easily.  This works even after you've worked on your application.

This assumes your deploying folder is `dist`. 

{% highlight bash %}
git checkout --orphan gh-pages
cp -r dist/. .
git add .
git commit -a -m "Your message"
git push -f origin gh-pages
{% endhighlight %}
