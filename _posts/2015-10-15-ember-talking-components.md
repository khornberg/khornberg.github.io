---
layout: post
title: ember-talking-components
categories: ['articles']
tags: ['ember']
published: True

---

A few months back when Ember was freshly at 1.13, I needed to get two components to talk to one another. Specifically, a list of summary data was displayed to the user as a list and when an item was clicked the full set of data should be displayed. So, two separate components needed to talk to one another. I did not want to fetch the data already downloaded.

"Use a controller," one might say. Nah, I know that they are going away. So how do I get two components that are not descendent's of each other to talk?

**An event bus.**

> "The event bus is a great fit for loosely coupled components yet makes the architecture difficult to reason about, impacting the testing side as well." - Frank Treacy

Frank Treacy has revamped the original article I read with a [new more clearly written one](http://emberigniter.com/communication-between-distant-components/).

I also read about this from [Paul Cowan](http://www.thesoftwaresimpleton.com/blog/2015/04/27/event-bus/).

So what follows is a simple example of the functionality I needed. The [code is here.](https://github.com/khornberg/ember-talking-components)

This example creates a basic page that has two input fields and a button for component A.

<img src="/images/before.png" width="250px">

Component B is a link. At first the link is not setup. When the user clicks the button, the data in the input fields (an url and display text) is used to modify the link. Uncomplicated but it shows the functionality desired.

<img src="/images/after.png" width="250px">

## Setup

Using the ember-cli to setup everything we need.

Add service `ember g service eventbus`
Add components `ember g component component-a`, `ember g component component-b`
Add acceptance test `ember g acceptance-test talking-components`


## Tests

I didn't write my tests first but I should have...

You have to give a name to the acceptance test but we want to test the `/` route. In the file, change `talking-components` to `/`.

The component tests make sure the fixture data is present.

The acceptance test tests that everything is working properly by checking that the anchor tag is changed and has an href attribute when the button is clicked. Doing so confirms that the components are talking.


## Code

Most of it follows Frank's and Paul's tutorials so I won't duplicate their work here. It is available [here](https://github.com/khornberg/ember-talking-components) to clone or look at if desired.

I am not quite sure if this is the best way to get the data from the input elements outside of using a form. It works though not elegant.

{% highlight js %}
let o = {};
this.get("childViews").forEach((v) => { o[v.name] = v.value; } );
this.set('formData', o);
{% endhighlight %}


## Wrapping up

Clone `https://github.com/khornberg/ember-talking-components`

Run `ember serve`

Go to `http://localhost:4200` to see it work

### Help

[The guides are actually good](http://guides.emberjs.com/v2.1.0/testing/)

### Some other examples of this problem:

[http://discuss.emberjs.com/t/communication-between-components/7353]()

[http://discuss.emberjs.com/t/how-to-communicate-to-child-components/7772]()
