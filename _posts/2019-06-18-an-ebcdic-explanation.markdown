---
layout: post
title:  "EBCDIC Format - How it works"
date:   2019-06-18 18:00:00
categories: EBCDIC Cobol packing
---

I wanted to write this article due to the fact I could not find any good resources covering what EBCDIC is. If you want to read about it's history have a look at the [wiki page][wikipage] (it has a jokes section).

### High Level in bullet points

* EBCDIC is a legacy encoding format. 
* It has many sets that are not compatible with each other.
* Uses an 8 bit character set.
* Incompatible with Ascii.








This post aims to teach the basic concepts of Javascript promises, how they work and some best practices.

### Promises 


I love a good metaphor so I shall attempt to use one to explain the basics of promises using a restaurant kitchen.

Lets imagine the restaurant only has a single chef and that a chef can only do one task at once. This means he needs to cook each item in turn, which leads to the following:

![](/assets/images/promisessinglechef.jpg)
*Multiple orders being worked on by the single chef.*

As you can see, the chef can quickly get overwhelmed by the orders coming in as he has to wait to act on the next order. Therefore he needs to hire a workforce.

#### Line Chefs

The head chef can ask a line chef to cook a dish. They will promise to return with the dish, and go off and cook it. The head chef can then use the dish when he is free.

The chef is used to fulfilling orders by cooking each item in turn. For each order he gives a line chef the first dish. When the head chef collects the dish he gives the next dish instruction to the line chef.

The time scale becomes slightly better in this scenario:

![](/assets/images/promiseschainchef.jpg)
*Multiple orders being worked on by the line chefs. The yellow is where the head chef inspects the order. The green, blue and orange are line chefs that are working on this order.*

The above management method treats each order as a chain of items that need to be completed.

We all know that there is room for improvement here - Parallelism. Following this management technique the head chef shouts each dish of an order to a different line chef.

This allows the team to work on all dishes without having to wait for the previous dish to be completed. Therefore this will decrease the amount of time it takes to complete an entire order.

![](/assets/images/promisesparallelchef.jpg)
*Multiple dishes being worked on at the same time by line chefs. The yellow is where the head chef inspects the order. The other colours are are line chefs that are working on this order.*

### Javascript

Now I am going to try to relate the metaphor above to Javascript.

Most of the time when Javascript code is executing, it’s usually as a single thread which means that it can only work on one task at at time. Just like our head chef! Therefore our head chef is the call stack of tasks to execute.

Promises are the line chefs. They can sit and wait for blocking actions such as the dish to cook and return the result once finished. They wait on the event loop for the call stack to become empty.

The diagram below shows two orders. The top one is using parallelism to add all the items to the event loop at once. The other is following the chaining methodology to add each item to the event loop each time.

![](/assets/images/promisescallstack.jpg)
*This diagram shows the interaction of the call stack and the event loop.*

#### Code

The following code is our starting point that we can use our new found knowledge to improve upon.

As we can see here, the chained method is the easiest way to write promises. By writing code like the below, we can just add pieces of additional functionality chaining onto the end of the promise chain.

{% highlight javascript %}
  processOrder(order) {
    return new Promise((resolve, reject) => {
      interpretOrder(order)
        .then((itemcount) => order.itemcount = itemcount)
        .then(() => cookCake(order))
        .then(() => cookPancake(order))
        .then(() => cookCereal(order))
        .then(() => resolve())
        .catch((err) => {
            reject(err);
        });
    });
  }
{% endhighlight %}

Just before we get into making the code parallel, a common issue I see is when everything is wrapped by another promise. However, it’s often much easier just to return the promise itself. This requires some refactoring:

{% highlight javascript %}
  processOrder(order) {
    return interpretOrder(order)
        .then((itemcount) => order.itemcount = itemcount)
        .then(() => cookCake(order))
        .then(() => cookPancake(order))
        .then(() => cookCereal(order))
        .catch((err) => {
            return(err);
        });
  }
{% endhighlight %}

Finally onto making everything parallel. This is done with ```Promise.all```. Now we have everything we need to create a parallel cooking step that will cook and return all the items at once rather than waiting for each to complete individually.

{% highlight javascript %}
  processOrder(order) {
    return interpretOrder(order)
        .then((itemcount) => order.itemcount = itemcount)
        .then(() => Promise.all([cookCake(order), cookPancake(order), cookCereal(order)]))
        .catch((err) => {
            return(err);
        });
  }
{% endhighlight %}

Hopefully this post has given you some food for thought for thinking carefully about how each promise can be extracted to become parallel, as it’s too easy to fall into the habit of just chaining promises together and not leveraging the event loop as much as we could and should.

#### Additional Resources

I highly recommend this [visualiser][visualiser] and the related talk, this really helped me wrap my head around the whole concept.

[visualiser]: http://latentflip.com/loupe/












[wikipage]: https://en.wikipedia.org/wiki/EBCDIC
