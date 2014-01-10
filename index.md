---
layout: page
title: 
---

### Recent Projects
<ul class="post-list">
	<li><article><i class="icon-code"></i> <a href="http://khornberg.github.com/bible-reading-planner">Bible reading planer</a><br />
A webapp to customize bible reading plans using bible.math.js <a href="/articles/bible-reading-planner">(Read more)</a>
	</article></li>

	<li><article><i class="icon-code"></i> <a href="http://wordpress.org/plugins/sermon-manager-import/">Sermon Manager Import</a><br />
Import .mp3 sermons into <a href="http://wordpress.org/plugins/sermon-manager-for-wordpress/">Sermon-Manager-for-Wordpress</a> using ID3 data. <a href="/articles/bible-reading-planner">(Read more)</a></article></li>

	<li><article><i class="icon-code"></i> <a href="http://github.com/khornberg/bible.math.js">bible.math.js</a><br />
Do math on bible references. Based on John Dyer's `bible.js` and `bible.reference.js` from the <a href="http://bib.ly">bib.ly</a> project. <a href="/articles/bible-reading-planner">(Read more)</a></article></li>
</ul>

### Recent Articles
<ul class="post-list">
{% for post in site.posts limit:10 %} 
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span></a></article></li>
{% endfor %}
</ul>
