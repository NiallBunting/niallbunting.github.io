---
layout: post
title:  "Small Startups - Guest Post Directory"
date:   2020-08-02 12:00:00
categories: small start ups guest post directory
---

This is the story of a start-up delivered at a blistering pace, one weekend in fact.

[Guest Post Directory][gpd] is a website that is designed to answer the question "Where can I guest post?". For those who are non-bloggers, guest posting is writing content for someone else’s website and in return receiving a link to yours. This is done in the blogging world as a means to increase your website’s ranking as guest posting grows your backlinks and at the same time grows your audience.

The journey below describes the process we went through, to build and launch a website in a weekend.

## The journey

### Preamble

The idea was suggested to me by my friend [Jake][jake]. I’m not heavily involved in the world of blogging but the problem of finding websites to guest post on seems like an easy one to fix. Hopefully, this project can deliver value to these people.

I have wanted to develop something ‘hackathon style’ for a while, where you have 48 hours to bring together an MVP. Therefore, I suggested this as the delivery plan for the project, as I thought it also gives us the highest chance that we actually finish something and bring a product to market.

He agreed and we chose a weekend.

### The weekend

Saturday morning I opened up my laptop and logged in. Jake was already online, plugging away, building out what would eventually become the listing page.

It was at this point that we had our first catch up and planned what features we needed, and workarounds for the non-MVP requirements. We made some tough decisions with the biggest ones being not supporting accounts, accepting applications over Google forms and entering database info manually.

Once we had an outline of a plan, we started building. Jake focused on the frontend and I focused on the backend and infrastructure. This plan played to both our natural strengths as he has much better design skills and I am more adept in the dark world of the backend.

Our technology stack:
* **The frontend**: Bootstrap and custom Javascript.
* **The backend**: Node (with Express) and Elasticsearch as the search engine.

The highlight on the backend technology side, for me, was using Elasticsearch. I haven’t looked into its features before (I’ve only used it as part of the ELK stack) and it was interesting to dive in, discovering its capabilities and exploring its query language. It was fun working out how to structure a query to get back the results we wanted, even though what we needed was a relatively simple search.

At the end of a very quick weekend we ended up with the following:

[![](/assets/images/posts/guestpost.png)][gpd]

### The following days

We have continued to do minor bug fixes and improvements to the application in the week since. Our main focus has been on making the platform more reliable and gathering users to provide value.

Throughout the process we’ve gathered a backlog of ideas and tasks that we want to do to improve the website. These tasks can now be tackled incrementally over time.

## My takeaways

After finishing the directory’s MVP that weekend, I was definitely on a high. The fact that we actually got a signup the next day just compounded it. I felt we had actually done our goal - a sometimes rare feeling in software engineering. Often sprints just seem to blur together in endless backlogs. Someone once said to me:

> I’ve been sprinting for years, it’s more like a marathon.
>
> -- <cite>Rob, from work</cite>

Which just shows the perfect world of iterations being separate just isn’t true, so it was nice to have that feeling of completion.

### Time limits

Cost, Scope and Time. You get to choose two sides of the triangle. We decided to fix both cost and time by limiting this challenge to 48 hours and not hiring a bunch of people.

This meant the only corner left was scope. We had a limited amount of scope we could deliver so we needed to make sure what we delivered was the best use of our time.

This meant that we had to push down scope as never before. If this project had been done on weekends over time we would have added other nice to have features such as not using Google Forms. However, we knew that it just wasn’t possible in one weekend.

### Real MVP

The time limit meant that we had to be serious about what our MVP looked like. This is different from when I’m working professionally and companies talk about having an MVP, however are very rarely happy with the results MVP. They worry about what their customers will think with such a minimalist product and rightly so.

However, for us we didn’t have any current users to disappoint, so it really didn’t matter much to us. If anything it was liberating, it meant that we could be truly flexible with the limited scope we could deliver.

This meant that we needed to focus on the core journey the customer would go through and allow that to be done in the most simple way possible. For example, we were happy to "go to market" with the signup form being a Google form as it still allows users to add their details while being quick for us to set up and manage.

## Future 

Now we have to see if we are delivering true value to bloggers. Especially to those who want to write and receive guest posts.

These are my biggest questions at the moment:

#### Is the problem finding "where to guest post" a problem?

Do people actually find it difficult to find blogs to guest post on? Or do they find them anyway by some other means?

Currently I’m not sure I’m deep enough a blogger to understand how big of a problem this is.

#### How much guest posting occurs?

This is something I’m curious about. I wonder how many people are actively writing guest posts. I’ve done one for a friend as he writes book reviews and I posted a review. However, outside of that I haven’t really done it.

It seems that it’s regarded as something that should be done, but I just wonder how prevalent it really is.

#### Is there higher levels of demand than supply?

I wonder who will end up seeking out the directory more. People who are wanting to guest post to improve their own sites ranking or the blog owners who are looking for content.

Obviously for our site to work we need a good mixture of both. As without one we won’t be able to get the other. Even though, once a blog is posted there is very little upkeep to keep it on the site so we may end up with many more blog owners.

#### Will the people with low DA get offers from writers?

I feel like this situation may lead to people with the highest Domain Authority getting many requests and the people with the lower Domain Authority getting barely any. This is because the value of the backlinks increases the more that website is worth. So if you have a low Domain Authority it’s not worth as much to guest post to that website as it would be on a more popular website.

Therefore I think the distribution may end up being rather unequal.

## Conclusions

I really enjoyed working on a project that had such a quick turnaround and that we could do in a weekend. There are more features that we would like to add to turn it into a rounded product so that we don’t have to manually intervene, but now the product is live we can continue to chip away incrementally. 

I would recommend giving this type of delivery plan a go and I would do another one in the future without a second thought. The style of development reminds me of my early days building software where my time wasn’t managed by tickets and release cycles - it was just about working on the most important stuff.

[gpd]: http://guestpost.directory
[jake]: https://jakedoran.co.uk
