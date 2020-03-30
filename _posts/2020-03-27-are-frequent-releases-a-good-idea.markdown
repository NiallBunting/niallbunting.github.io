---
layout: post
title:  "Are frequent releases a good idea? - The Costs of Releasing Software"
date:   2020-03-27 14:30:00
categories: frequent releases costs software
---

Releasing software often has costs which can hinder your ability to release frequently.

Many teams have an ideal where their version of 'done' for an item of work is having it in production. This has the secondary effect of teams wanting to release more frequently, either every static amount of time or per number of items of work.

I've been in many meetings where the team is in agreement that this is something they would like to pursue. This post aims to provide a model to evaluate if that goal is suitable or if batch releasing should be preferred.

![](/assets/images/costs-of-software/header.png)

## Accounting Model

This post uses an economic framework to describe the value of releases. Economics often assigns everything a monetary value, which you may wish to do or at least estimate. However understanding the core concept, which doesn't require exacting amounts, is good enough for the purposes of decision making and discussion.

For the purpose of this article the word 'value' will be used as a sort of handwavy way of thinking about this. Another thing to note is that we are talking 'per release' for the values below.

# Revenue

For these purposes revenue means the total amount of value that all of your releases generate. Since we are interested in revenue per release, this is the amount of value that a given release delivers.

The revenue per release will change based on how many features are in a given release or how in demand a given feature is. If you release a broken release you may actually reduce the revenue for an amount of time, due to customers being less happy.

# Costs

Releasing has costs, these can be tangible such as 'people time' in the release process, or it may just be more mentally taxing. There is often much more of a focus on tangible costs, however the hidden costs should also be considered here.

Small costs are important as they add up, for example sending one email is a cost and waiting for a response to that email is also a cost. Even though these small costs seem minimal, they do require someone thinking about them and often planning who will perform those actions.

There are two types of costs for releases, fixed costs and variable costs. Fixed costs are independent of the amount/size of features, whereas variable costs are dependent on amount/size of features.

Your total cost is both the fixed costs + the variable costs, as can be seen on the diagram below. This is the total cost of doing a release.

![](/assets/images/costs-of-software/costs.png)

## Fixed Costs Per Release

These items are fixed per release and don't depend on the amount of items of work in a given release, i.e. these costs would be the same if you release one small feature or many huge ones. These costs can be further split into the three categories of before, during and after.

Before
* Discussing what to release.
* Outside stakeholders that need to sign off work eg. CAB.
* Internal management sign off.

During
* Following the release process.
* Any downtime in service.

After
* Any smoke testing afterwards.
* If out of office hours release, the physical/mental effects that has on team members.


## Variable Costs Per Release

These costs depend on the size of the release, i.e. if more items of work are included these get larger. These can also be split into the same three categories.

Before
* Release QA
* Running Automated tests
* Preparing any configuration
* Documenting all the features released
* Sign off for individual features

During
* Complexity of the release. Larger changes mean more to think about.

After
* Deeper testing on specific features.
* Fixing any bugs that may have occurred

It’s worth noting that the variable costs start after the feature has been developed and any initial quality assurance is completed.

# Profit

Now this is the exciting part, this is what we are looking to maximise. To calculate this you do revenue minus costs for a given release.

You can change both elements in this equation to help improve your profit, this could be via reducing costs or increasing the revenue per release.

## Increasing Revenue

Assuming that the team output is constant, then this can only be done by increasing the amount of value in a given release.

Increasing the amount in each release also means delivering less frequently, which is not the goal of the team at the moment.

## Reducing Costs

Within costs there are both the fixed and variable costs, bearing in mind our goal of more frequent releases we can think about both of these.

* The variable costs will reduce if releases are made smaller, as they grow from each additional item of work. These costs therefore will naturally decrease as releases are smaller.
* As your releases get smaller the fixed costs do not change, these will slowly become the major portion of the costs as the variable costs reduce to smaller releases.

This means that the focus should be on removing the fixed costs of releasing because as we have seen above, the variable costs will "take care of themselves".

## Profit summary

For smaller releases:
* Revenue decrease
* Variable costs decrease
* Fixed costs remain the same

A clear example of how these costs build up for more frequent releases are shown in this comic, as the amount of time worth fixing the process grows below.

![](/assets/images/costs-of-software/xkcd-1205.png)
*Reference: [XKCD 1205][xkcd1205]*

# Outcome

This means that the best way to work out if it is possible for your team to release more frequently is to decide as a team if it’s possible to reduce the fixed costs down to a minimal value. If you have aspects of the fixed costs you cannot change this goal may not make sense for your team. This often is organisational and these decisions and processes are made outside the team.

If the team can't change these processes, then it may be more profitable to have more value in each release (higher revenue) for each time you need to pay the costs. The goal of smaller releases may not be the best option and it may be better to choose a larger release cycle.

To sum up, this very much depends on your organisation and how much freedom your team has. High dependencies mean that you should probably aim for infrequent batched releases and vice versa for low dependencies.

# Footnote

I hope this article has helped and can bring more nuance to the argument for releasing faster depending on the organisational structure around your team.

Just a small note on one approach that most teams can start with if they want to make clear the current costs. Try scripting every process (or map them on a whiteboard). The goal here is to run this one script and the release should happen. For example: If you require approvals, you could have a script set up to email some team and let them click a link when to approve.


[xkcd1205]: https://xkcd.com/1205/
