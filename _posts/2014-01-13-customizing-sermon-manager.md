---
layout: post
title: Customizing Sermon Manager
tag: [WordPress, Sermon Mangaer, plugin]
category: articles
---
Customizing Sermon Manager for WordPress varies in difficultly depening on what you'd like to do.

You can use your own templates and either use Sermon Manager's built in functions or your own functions. Below you will find how to display both audio and video and how to display download links that use the `download-shortcode` plugin.

## Built in Functions

If you want to change the shortcode or keep the defaults but add functionality, then you need to change the core. Primarily, you only need to change two functions. `wpfc_sermon_files` and `render_wpfc_sermon_excerpt`. `render_wpfc_sermon_single` is optionally another function you might change.

#### `render_wpfc_sermon_excerpt` 
Called in the `[sermons]` shortcode and on Archive, Bible book, Preacher, Series, Topics, and Service pages.

#### `render_wpfc_sermon_single`
Called on Single sermon pages.

#### `wpfc_sermon_files` 
Called in both `render_wpfc_sermon_excerpt` and `render_wpfc_sermon_single` functions when ever **a media player is displayed**.

## Download Audio and Video Links

Call `sermon_download_media` in any of the functions above and download links will be displayed. This can also be used to replace the `wpfc_sermon_attachments()` function.

If you have the [download shortcode](http://wordpress.org/plugins/download-shortcode/) plugin installed the links download the file rather than the play the file.

{% highlight php linenos %}
<?php
/**
 * Display download link for sermon excerpt
 *
 * @return void
 * @author khornberg
 **/
function sermon_download_media()
{
    $audio = (get_wpfc_sermon_meta('sermon_audio')) ? true : false;
    $video = (get_wpfc_sermon_meta('sermon_video')) ? true : false;

	// Check if the download-shortcode plugin active
    include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
    if ( is_plugin_active( "download-shortcode/download-shortcode.php" )) {
        if ($audio && $video) {
            echo do_shortcode( '[download label="'.__( 'Download Audio', 'sermon-manager').'"]' . get_wpfc_sermon_meta('sermon_audio') . '[/download]' );
            echo do_shortcode( '[download label="'.__( 'Download Video', 'sermon-manager').'"]' . get_wpfc_sermon_meta('sermon_video') . '[/download]' );
        }
        elseif ($audio) {
            echo do_shortcode( '[download label="'.__( 'Download', 'sermon-manager').'"]' . get_wpfc_sermon_meta('sermon_audio') . '[/download]' );
        }
        elseif ($video) {
            echo do_shortcode( '[download label="'.__( 'Download', 'sermon-manager').'"]' . get_wpfc_sermon_meta('sermon_video') . '[/download]' );
        }
    } else {
        if ($audio && $video) {
            echo '<a target="_blank" href="' . get_wpfc_sermon_meta('sermon_audio') . '">'.__( 'Download Audio', 'sermon-manager').'</a>';
            echo '<a target="_blank" href="' . get_wpfc_sermon_meta('sermon_video') . '">'.__( 'Download Video', 'sermon-manager').'</a>';
        }
        elseif ($audio) {
            echo '<a target="_blank" href="' . get_wpfc_sermon_meta('sermon_audio') . '">'.__( 'Download Audio', 'sermon-manager').'</a>';
        }
        elseif ($video) {
            echo '<a target="_blank" href="' . get_wpfc_sermon_meta('sermon_video') . '">'.__( 'Download', 'sermon-manager').'</a>';
        }
    }
}
{% endhighlight %}

## Display Audio and Video

To display both audio and video you can either replace the core function of `wpfc_sermon_files` or create another function that combines `render_wpfc_sermon_excerpt` or `render_wpfc_sermon_excerpt` and this function.

This shows the video above the audio player.

{% highlight php linenos %}
<?php
function display_audio_video()
{
    wp_enqueue_script('mediaelement');
	wp_enqueue_style('mediaelement');

	// Display video
    if ( get_wpfc_sermon_meta('sermon_video') ) {
        echo '<div class="wpfc_sermon-video cf">';
            echo do_shortcode( get_wpfc_sermon_meta('sermon_video'));
        echo '</div>';
    } 
    // Display audio player
    if ( get_wpfc_sermon_meta('sermon_audio') ) {
        echo '<div class="wpfc_sermon-audio cf">';?>
            <script>
                jQuery.noConflict();
                jQuery(document).ready(function(){
                    jQuery('audio').mediaelementplayer();
                });
            </script> <?php
            echo '<audio controls="controls">';
                echo '<source src="' . get_wpfc_sermon_meta('sermon_audio') . '"  type="audio/mp3" />';
            echo '</audio>';
        echo '</div>';
    }
}
{% endhighlight %}

Combined for a view.

{% highlight php linenos%}
<?php
function render_sermon_single()
{
    global $post; ?>
    <div class="wpfc_sermon_wrap cf">
        <div class="wpfc_sermon_image">
            <?php render_sermon_image('sermon_small'); ?>
        </div>
        <div class="wpfc_sermon_meta cf">
            <p>
                <?php
                    wpfc_sermon_date(get_option('date_format'), '<span class="sermon_date">', '</span> '); echo the_terms( $post->ID, 'wpfc_service_type',  ' <span class="service_type">(', ' ', ')</span>');
            ?></p><p><?php
                    wpfc_sermon_meta('bible_passage', '<span class="bible_passage">'.__( 'Bible Text: ', 'sermon-manager'), '</span> | ');
                    echo the_terms( $post->ID, 'wpfc_preacher',  '<span class="preacher_name">', ', ', '</span>');
                    echo the_terms( $post->ID, 'wpfc_sermon_series', '<p><span class="sermon_series">'.__( 'Series: ', 'sermon-manager'), ' ', '</span></p>' );
                ?>
            </p>
        </div>
    </div>
    <div class="wpfc_sermon cf">
        <?php 
            wp_enqueue_script('mediaelement');
            wp_enqueue_style('mediaelement');

            // Display video
            if ( get_wpfc_sermon_meta('sermon_video') ) {
                echo '<div class="wpfc_sermon-video cf">';
                    echo do_shortcode( get_wpfc_sermon_meta('sermon_video'));
                echo '</div>';
            } 
            // Display audio player
            if ( get_wpfc_sermon_meta('sermon_audio') ) {
                echo '<div class="wpfc_sermon-audio cf">';?>
                    <script>
                        jQuery.noConflict();
                        jQuery(document).ready(function(){
                            jQuery('audio').mediaelementplayer();
                        });
                    </script> <?php
                    echo '<audio controls="controls">';
                        echo '<source src="' . get_wpfc_sermon_meta('sermon_audio') . '"  type="audio/mp3" />';
                    echo '</audio>';
                echo '</div>';
            }
        ?>
         <?php wpfc_sermon_description(); ?>

        <?php wpfc_sermon_attachments(); ?>

        <?php echo the_terms( $post->ID, 'wpfc_sermon_topics', '<p class="sermon_topics">'.__( 'Topics: ', 'sermon-manager'), ',', '', '</p>' ); ?>
    </div>
<?php
}
{% endhighlight %}
