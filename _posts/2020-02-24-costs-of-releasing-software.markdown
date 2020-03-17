---
layout: post
title:  "The Costs of Releasing Software"
date:   2020-02-24 14:30:00
categories: costs releasing software fixed variable
---


Releasing software has often hidden costs, this can hinder your ability to release frequently.

Many teams wish to get to a state where there version of 'done' on a item of work, is it being in production. This has the secondary effect of teams wanting to release more frequently, this can be a static amount of time or per number of items of work.

I've been in many meetings where the team is in agreement that this is something they would like to persue. What I hope to provide is a model to use to see if this is possible and the areas that could be focused on to get the best rate of return.

# Costs

Releasing has costs, this can be tangable such as people time in the release process, or it may just be more mentally taxing. These are all costs even though here we will focus more on the tangable costs. 

Any interaction here can be a cost one email is a cost, even though it seems minimal. A 5 min email is a cost. Waiting for that email response is a cost.

From economics there are two types of costs. Fixed costs are independant of output. Variable costs are dependent on output.

Your total cost is both the fixed costs + the variable costs. This is the cost of doing a release.

[DIAGRAM OF FIXED AND VARIABLE COSTS][]

## Fixed Costs

These items are fixed per release and don't depend on the the amount of items of work in a given release, these costs would be the same if you release one ticket or many. These can be further split up into the three categories of before, during and after.

Before
* Discussing what to release.
* Outside teams that need to sign off work.
* Internal management sign off.

During
* Following the release process.
* Any downtime in service.

After
* Any smoke testing afterwards.
* If out of office release, team members physical deminour.


## Variable Costs

These costs depend on the size of the release, if more items of work are included these tend to be much larger. These can also be split into the three categories.

The costs here start after the ticket has been developed and any initial quality assurance is completed.

Before
* Release QA
* Running Automated tests
* Preparing any config

During
* Complexity of the release. Larger changes mean more to think about.

After
* Deeper testing on specific features.
* Fixing any bugs that may have occured

# Revenue



Releases do have a form of revenue in this model and this is hard to quantify however it is the benefit it brings to your customers, this may be able to be talked about in money terms with some features. However sometimes it's a non-tangable value.


# Profit





You have to think of each release having a certain about of value. You really want to make sure that you are breaking even even better 


Since the variable costs diminish on the amount of work in each release, if you make your releases small they basicly vanisheh themselves. That's why it's important to focus on the fixed costs to begin with. If you don't have control over your fixed costs then you are going to find it difficult to release in a manner that enables you to do small releases. Your balance may be better off not aiming for such small releases as the fixed costs overhead of doing the releases will far outweigh t.





# Margins

How big do you want you margin




# Something something

The importance between these two costs is that you can see that the variable costs will be minimal if small amount of work is released at a time. This is especially true as the person still has all the knowledge of what has happened in their head, meaning that some of the complexity gets reduced again as people don't need to do to figure out what happened out a couple of months ago.

This often means that the fixed costs are your real blockers as variable costs reduce themselves as you release faster and you can start to worry about them much less.



# Importance of Reducing Costs

If you calculate the costs for your project, you may notice that many small tasks add up for a release causing it to take more time than expected.

Just to put the costs in perspective I often see release that take about an hour worth of time. If you did this weekly it would still be worth working on it for 10 days straight trying to reduce the time, so for a typical interaction of a fortnight its worth spending about 5 days on it.

[XKCD OF COSTS][]
*Reference: XKCD 1205*

# An apprach

One way to attempt to reduce the amount of manual work, by scripting every process. You could have a script set up to email some team and let them click a link when to approve, however you still run into the problem that the may want clarification on issues.



# Conclusions
It often depends on the exact team and its problems what they can change and what they can't. If you can't vary some of the fixed costs it may make sense to not focus on having the fastest release cycle as the fixed costs dwalf the benefit that you gain.

It's just important to consider if the goal makes sense in your team (at least in the short term), if you can remove your fixed costs you can get faster and faster.



[kafka]: https://kafka.apache.org/
[sasl]: https://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer
[jaas]: https://en.wikipedia.org/wiki/Java_Authentication_and_Authorization_Service
[springref]: https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html
