---
layout: page
title: 
---
 
## After Darkness Light  

The world changes constantly yet there is nothing new under the sun. Philosophy matters. So does a person's epistemology. These things shape our thinking. Developing shapes our thinking. You will find a little bit about how I think through the articles and projects.

### Recent Projects
<ul class="post-list">
	<li><article><a href="http://khornberg.github.com/bible-reading-planner">Bible reading planer</a><br />
<i class="icon-caret-right"></i> A webapp to customize bible reading plans using bible.math.js.</article></li>

	<li><article><a href="http://wordpress.org/plugins/sermon-manager-import/">Sermon Manager Import</a><br />
<i class="icon-caret-right"></i> Import .mp3 sermons into <a href="http://wordpress.org/plugins/sermon-manager-for-wordpress/">Sermon-Manager-for-Wordpress</a> using ID3 data.</article></li>

	<li><article><a href="http://github.com/khornberg/bible.math.js">bible.math.js</a><br />
<i class="icon-caret-right"></i> Do math on bible references. Based on John Dyer's `bible.js` and `bible.reference.js` from the <a href="http://bib.ly">bib.ly</a> project.</article></li>
</ul>

### Recent Articles
<ul class="post-list">
{% for post in site.posts limit:10 %} 
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span></a></article></li>
{% endfor %}
</ul>
