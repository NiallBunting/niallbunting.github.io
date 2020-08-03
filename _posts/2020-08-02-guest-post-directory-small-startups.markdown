---
layout: post
title:  "Small Startups - Guest Post Directory"
date:   2020-08-02 12:00:00
categories: small start ups guest post directory
---

This is the story of a start-up delivered at a blistering pace, one weekend in fact.

[Guest Post Directory][gpd] is a website that is designed to answer the question "Where can I guest post?". For those who are non-bloggers, guest posting is writing content for someone else's website and in return receiving a link to yours. This is done in the blogging world as a method to increase your websites ranking and SEO as guest posting grows your back links.

The journey below, describes the process we went through, to build and go live with the website in a weekend.

## The journey

### Preamble

The idea was suggested to me by my friend [Jake][jake]. I'm not heavily involved in the world of blogging but the problem of finding websites to guest post on seems like an easy one to fix. Hopefully, this project can deliver value to these people.

I have wanted to develop something in hackathon style project for a while, where you have 48 hours to bring together an MVP. Therefore, I suggested this as the format for the project. It also gives us the highest chance that we actually bring a product to market.

He agreed and chose a weekend.

### The weekend

Saturday morning, I opened up my laptop and logged in. Jake was already online, plugging away, building out what would eventually become the listing page.

It was at this point that we had our first catch up and planned what features we needed, and workarounds for the other requirements. We had to make some tough decisions with some of the big ones being removing accounts, accepting applications over Google forms and entering database info manually.

Once we had created this outline of a plan, we started work. Jake focused on the frontend and I focused on the backend and infrastructure. As this played to both our natural strengths as he has much better design skills whilst he has less familiarity with backend technologies.

Our technology stack was:
* The frontend: Bootstrap and custom Javascript.
* The backend: Node with Express and Elasticsearch as the search engine.

The highlight on the backend technology side, was using Elasticsearch, I haven’t explored before (outside of use in the ELK stack). It was interesting to have shallow dive to find out its capabilities and query language. It was fun working out how to structure a query to get back the result types that we wanted, even though it ended up being a relatively simple search.


At the end of a very quick two days we ended up with the following:

[![](/assets/images/posts/guestpost.png)][gpd]

### The following days

We have continued to do minor bug fixes and improvements to the application in the week since. Our main focus has been on making the platform more reliable and gathering users.

We have a backlog of ideas and tasks that need doing to improve the website, that we want to get to over the future.

## My takeaways

After finishing our products MVP that weekend, I was definitely feeling on a high. That we actually got a signup the next day just added to it. I felt like we were actually done, with what we set out to do, that’s sometimes a rare feeling in software engineering. Often sprints just seem to blur together in endless backlogs and as someone said to me:

> I’ve been sprinting for years, it’s more like a marathon.
>
> -- <cite>Rob, from work</cite>

It was great to hit the goal of MVP and actually be done.

### Real MVP

The fact that we were really building an MVP meant that we had to strip loads of features out. This means that we had to consider all problems in a different way and use whatever was easiest to do.

We were happy to “go to market” with the signup form being a Google form for example as we didn’t think this would take away from finding out where to guest post. It’s also just one stage of the process.

We also focused on the core journey of the product to make sure that would work rather than getting bogged down with things like authentication and validation of user input. Which if you want to do securely can often end up taking a lot of time.

### Time limits

The time limits imposed also further meant that we had to push down the scope as we knew we had to do it in two days. This meant that things that we would probably have left in as MVP got stripped out.

This however caused us to be creative on how we achieved what we want with the tools and the time we had available.

## Future 

Now, we have to see if we are helping delivering value to bloggers. Especially people who want to write and receive guest posts.

These are my biggest questions at the moment:

#### Is “where to guest post a problem”?

Do people actually find it difficult to find blogs to guest post on? Or do they find them through some means anyway or just contact their favorite blog and see if they can get onto that.

I’m not sure I’m deep enough a blogger to understand how big of a problem this is.

#### How much guest posting occurs?

This is something I’m curious about. I wonder how many people are doing guest posts. I’ve done one for a friend as he writes book reviews and I posted a review.

I wonder how prevalent it is on the wider internet because it’s talked about quite a lot.

#### Demand vs supply

I wonder who will end up seeking out wanting the directory more. People who are wanting to guest post to improve their own sites ranking or the blog owners who are looking for content.

Obviously for our site to work we need a good mixture of both. As without one we won’t be able to get the other. Even though once a blog is posted there is very little upkeep to keep it on the site.

#### The curve and demand

I feel like this situation may lead to people with the highest Domain Authority getting many requests and the people with the lower Domain Authority getting barely any. This is because the value of the backlinks increases the more that website is worth. So if you have a low Domain Authority it’s not worth as much to guest post to that website as it would be on a more popular website.

## Conclusions

I really enjoyed working on a project that had such a quick turnaround and that we could do in a weekend. There are more features that we would like to add to turn it into a rounded product that we don’t have to manually intervene in.

I would recommend giving this type of project a go and I would do another one in the future without a second thought. As it reminds me of my early days building software where I wasn’t managed by Jira and release cycles it was just about getting a good enough working product out.

[gpd]: http://guestpost.directory
[jake]: https://jakedoran.co.uk
