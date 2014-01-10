---
layout: post
title: WordPress Dashboard Hook
tag: [WordPress, hook, dashboard]
category: articles
---

### Introduction to hook dashboard_glance_items

The [WordPress dashboard changed in 3.8](https://core.trac.wordpress.org/ticket/26495). The hooks to add things to the "Right Now" widget are gone and a new one set in place. Plugins that do not use the new hook will silently fail and nothing will show in the "At a Glance" widget area.  

This hook may change in the future. [See discussion](https://core.trac.wordpress.org/ticket/26571). 

I'll show you how to use the new hook and at the end is full an example from a plugin.

### What can you do?

The new hook is `dashboard_glance_items`. Reference a function that echoes or returns a string value of an HTML list item with a link: `<li><a>Text</a></li>`.

That gets us a circle icon with a blue link that goes nowhere.

#### Make it useful

The link can go anywhere you want, likely to a custom post type page. `<a href="edit.php?post-type=custom_post_type">7 Custom</a>`.

The icon is set by adding a class to the list item and defining a style and echoing it in the referenced function. To get a different icon you can use an already defined WordPress style with the content defined. [Here is a list](plugins.trac.wordpress.org/browser/glance-that/trunk/glance-that.php#L490). Or you can specify your own image.

#### Icon
`echo "<style>.custom_post_type-count a:before { content: '\\f330' !important;}</style>";`

#### Image
` echo "<style>.custom_post_type-count a:before { content: url('" . SM_PLUGIN_URL.'includes/img/book-open-bookmark.png' . "') !important; margin-left: 2px !important; margin-right: 7px !important;}</style>";`

#### Add a class
`$items = '<li class="custom_post_type-count">' . $link . '</li>';`

You want to place the style before the list element. Note that these styles are using the `!important` override because you are overriding the default content style for `li a:before`. If you use an icon of your own, you can change the margins a bit to center it.

This is not the prettiest solution however.

### This's a plugin for it

If all of that is laborious then you can use a plugin called [Glance That](wordpress.org/plugins/glance-that/).

### Example

![Right Now](/images/RightNow.png)

![At a Glance](/images/AtaGlance.png)

The code below produce what you see in the pictures.

{% highlight php %}
/*
 * @since 2014-01-08
 * Add the number of sermons to the Right Now / At a Glance on the Dashboard
 */
if ( preg_match('/3.(6|7)/', $wp_version) ) {
	add_action('right_now_content_table_end', 'wpfc_right_now');
}
else {
	add_action('dashboard_glance_items', 'wpfc_dashboard');
	// add_action('dashboard_glance_items', 'wpfc_dashboard');
}

// For WP 3.6 and 3.7
function wpfc_right_now() {
    $num_posts = wp_count_posts('wpfc_sermon');
    $num = number_format_i18n($num_posts->publish);
    $text = _n('Sermon', 'Sermons', intval($num_posts->publish));
	if ( current_user_can('edit_posts') ) {
	    $num = "<a href='edit.php?post_type=wpfc_sermon'>$num</a>";
	    $text = "<a href='edit.php?post_type=wpfc_sermon'>$text</a>";
	}
	echo '<td class="first b b-sermon">' . $num . '</td><td class="t sermons">' . $text . '</td></tr>';	
}

// For WP 3.8+
function wpfc_dashboard() {
    $num_posts = wp_count_posts('wpfc_sermon');
    $num = number_format_i18n($num_posts->publish);
    $text = _n('Sermon', 'Sermons', intval($num_posts->publish));

    if ( current_user_can('edit_posts') ) {
    	$link = '<a href"edit.php?post_type=wpfc_sermon">' . $num . ' ' . $text . '</a>';
    }
    else {
    	$link = $num . ' ' . $text;
    }
    $items = '<li class="sermon-count">' . $link . '</li>';
    // user icon
    echo "<style>.sermon-count a:before { content: url('" . SM_PLUGIN_URL.'includes/img/book-open-bookmark.png' . "') !important; margin-left: 2px !important; margin-right: 7px !important;}</style>";
    // WordPress defined icon
	// echo "<style>.sermon-count a:before { content: '\\f330' !important;}</style>"; 
    echo $items;
}
{% endhighlight %}


  [1]: http:
