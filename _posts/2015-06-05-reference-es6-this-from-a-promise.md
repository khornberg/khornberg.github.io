---
layout: post
title: Reference ES6 this from a Promise
categories: ['articles']
tags: []
---

How do you refer to the contructor properties of an ES6 class within a returned Promise?

This question came from the Simplenote ES6 wrapper I am working on.

I do not want to use `self = this`.

So after reading parts of [You Don't Know Javascript](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes) the solution was clear.

The key is to use a fat arrow function to maintain the lexical scope of the call-site.

We can see this in action in the following example class.

```
/* jshint esnext: true */

class foo {
    constructor () {
        this.a = 'a';
        this.b = 'b';
    }

    // returns the properties
    bar () {
        return [this.a, this.b]; // refers to the constructor
    }

    // this within the Promise does not refer to the class this
    p () {
        return new Promise (function (r, j) { r([this.a, this.b]); }); // this does not have a or b
    }

    // anonymous function
    ps () {
        let self = this;
        return new Promise (function (r, j) { r([self.a, self.b]); });
    }

    // fat arrow function
    pa () {
        return new Promise ((r, j) => { r([this.a, this.b]); });
    }


}

let obj1 = {a: '1', b: '2'};

let f = new foo();

console.log('f.bar', f.bar()); // f.bar [ 'a', 'b' ]
console.log('f.bar.call', f.bar.call(obj1)); // f.bar.call [ '1', '2' ]

f.p().then(m => console.log('p', m)); // does not return anything
f.ps().then(m => console.log('ps', m)); // ps [ 'a', 'b' ]
f.pa().then(m => console.log('pa', m)); // pa [ 'a', 'b' ]
```

Run through [babel-node](babeljs.io) to see it work.

One might expect function `p` to work; however, the anonymous function changes the value of this.  
Two methods to refer to the "class properties" are either to assign this to self, which I don't to do or use a fat arrow function in the Promise. Since I want to use ES6 sytnax and features, fat arrows are preferred.

The class snippet started like this:

```
class SimpleNote {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.notes = [];
    this.api = "https://simple-note.appspot.com/api/";
    this.api2 = "https://simple-note.appspot.com/api2/";
  }

  auth() {
    // base64 encoding of auth params
    var query = encode("email=" + this.email + '&password=' + this.password),
        self = this;

    if (this.token === null) {
      return new Promise(
        function(resolve, reject) {
          request
            .post(self.api + 'login')
            .send(query)
            .end(function(err, res) {
              if (res.error) {
                reject(res.error);
              }
              self.token = res.text;
              resolve(res.text);
            });
        });
    }

    return Promise.resolve(self.token);
  }
```

And the snippet ended like so:

```
class SimpleNote {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.notes = [];
    this.api = "https://simple-note.appspot.com/api/";
    this.api2 = "https://simple-note.appspot.com/api2/";
  }

  auth() {
    // base64 encoding of auth params
    var query = encode("email=" + this.email + '&password=' + this.password);

    if (this.token === null) {
      return new Promise(
        (resolve, reject) => {
          request
            .post(this.api + 'login')
            .send(query)
            .end(function(err, res) {
              if (res.error) {
                reject(res.error);
              }
              this.token = res.text;
              resolve(res.text);
            });
        });
    }

    return Promise.resolve(self.token);
  }
```
