---
layout: page
title: 
---
 
### After Darkness Light  

The world changes constantly yet there is nothing new under the sun. Philosophy matters. So does a person's epistemology. These things shape our thinking. Developing shapes our thinking. You will find a little bit about how I think through the articles and projects.

<ul class="post-list">
{% for post in site.posts limit:10 %} 
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span></a></article></li>
{% endfor %}
</ul>
