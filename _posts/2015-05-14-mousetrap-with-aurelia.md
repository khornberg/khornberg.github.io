---
layout: post
title: Mousetrap with Aurelia
categories: ['articles']
tags: ['aurelia']

---

I have recently begun working on several projects using [Aurelia](aurelia.io). I see a lot of good concepts and look forward to it continuing to mature. ([Bundling](http://stackoverflow.com/questions/28258956/why-does-the-alpha-version-of-aurelia-load-slowly) and [performance are not there yet...](http://blog.durandal.io/2015/02/03/aurelia-qa/))

I needed to convert a simple HTML5 site using a few modules to a site using Aurelia. One major component that Aurelia uses is [jspm](jspm.io). How does one use an npm module in Aurelia? Magic.

Not exactly but it kinda seems like that.

The specific npm module I need to get working is [mousetrap](https://craig.is/killing/mice).

Steps to get it working:
1. Install via `jspm`
2. Import module
3. Initialize the module
4. Use the module

### Install

Simple command line of `jspm install npm:mousetrap`

### Import

Aurelia is a "next generation framework." New language features like `import` are supported.
So to import the module add the following to the top of the class file.

{% highlight javascript %}
import * as Mousetrap from 'mousetrap';
{% endhighlight %}

### Initialize

That provides accessible code to the class.

Mousetrap is not built as an ES6 module so one has to initialize it for it to work.

In the class constructor add the following code.

{% highlight javascript %}
this.mousetrap = new Mousetrap.default();
{% endhighlight %}

### Use it

Now the `Mousetrap` module is ready to use within your class. Simple once one knows what is expected.

{% highlight javascript %}
this.mousetrap.bind('?', function() {
  console.log('j: move up\nk: move down\n?: show this help');
});
{% endhighlight %}


## Final Code

{% highlight javascript %}
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import * as Mousetrap from 'mousetrap';

@inject(HttpClient)
export class Queries{

  constructor(http){
    this.http = http;
    this.mousetrap = new Mousetrap.default();
  }

  activate(){
    this.mousetrap.bind('?', function() {
      console.log('j: move up\nk: move down\n?: show this help');
    });
  }

}
{% endhighlight %}
