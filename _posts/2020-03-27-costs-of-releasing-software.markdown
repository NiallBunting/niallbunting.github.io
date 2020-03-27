---
layout: post
title:  "The Costs of Releasing Software"
date:   2020-03-27 14:30:00
categories: costs releasing software fixed variable
---

![](/assets/images/posts/costs-of-software/header.png)

Releasing software has often hidden costs, this can hinder your ability to release frequently.

Many teams wish to get to a state where there version of 'done' on a item of work, is it being in production. This has the secondary effect of teams wanting to release more frequently, this can be a static amount of time or per number of items of work.

I've been in many meetings where the team is in agreement that this is something they would like to pursue. What I hope to provide is a model to use to see if this is possible and the areas that could be focused on to get the best rate of return.

# Accounting Model

This is going to use a very economic model to describe the value of releases. Economics often assigns everything a monetary value, this may be possible with this model either exact or through estimates.

This may be useful for understanding but this concept doesn't require exacting amounts and general thoughts about these ideas are okay.

For the purposes of this article the word 'value' will be used as a sort of handwavy of thinking about this.

# Revenue

This is the total amount of value that all of your releases generate.

Here we are interested in revenue per release. This is the amount of value that a given release delivers.

The revenue per release will change based on how many features are in a given release or how in demand a given feature is. If you release a broken release you may actually reduce the revenue for an amount of time, due to customers being less happy.

# Costs

Releasing has costs, this can be tangible such as people time in the release process, or it may just be more mentally taxing. These are all costs even though here we will focus more on the tangable costs. 

Any interaction here can be a cost one email is a cost, even though it seems minimal. A 5 min email is a cost. Waiting for that email response is a cost.

From economics there are two types of costs. Fixed costs are independent of output. Variable costs are dependent on output.

Your total cost is both the fixed costs + the variable costs. This is the cost of doing a release.

![](/assets/images/posts/costs-of-software/costs.png)

## Fixed Costs Per Release

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
* If out of office release, team members physical demeanour.


## Variable Costs Per Release

These costs depend on the size of the release, if more items of work are included these tend to be much larger. These can also be split into the three categories.

The costs here start after the ticket has been developed and any initial quality assurance is completed.

Before
* Release QA
* Running Automated tests
* Preparing any configuration

During
* Complexity of the release. Larger changes mean more to think about.

After
* Deeper testing on specific features.
* Fixing any bugs that may have occurred


# Profit

Now this is the exciting part, this is what we are looking to maximise. Calculating is the revenue minus the costs for a given release.

You can change both elements in this equation to help improve your profit, this could be via reducing costs or increasing the revenue per release.

## Increasing Revenue

Assuming that the team output is constant. This can only be done by increasing the amount of value in a given release.

## Reducing Costs

Within costs there are both the fixed and variable costs. If we want to have the goal of smaller releases then I think the focus here needs to be on the fixed costs.

The variable costs will essentially diminish themselves if your releases are made smaller, this is due to less work being effected. This therefore will naturally decrease if you make your releases faster.

The fixed costs are the most important ones to focus on for increasing profit as they are likely to take a larger amount of time as your releases get smaller. Therefore the focus should be making these smaller.

## Releasing Frequently

If our goal is to release more frequently what does this mean.

First of all this is going to directly decrease revenue, as less value is going to be released through a given release.

Therefore our only option is to reduce costs. As we are having smaller releases this means that the variable costs become less of a problem. The major cost quickly becomes the fixed costs as they take up the greatest proportion of each release.


# Outcome

This means that the best way to work out if it is possible for your team to release more frequently is to decide if as a team if its possible to reduce the fixed costs down to a minimal value. If you have aspects of the fixed costs you cannot change this goal may not make sense for your team.

If you don't have the power, it may be more sensible to think about having more value in each release (higher revenue) to make more revenue for each time you need to pay the costs. This should lead to a overall greater profit, even though some of the revenue is deferred into the future.

The effect of each cost is summed up in the following XKCD commic.

![](/assets/images/posts/costs-of-software/xkcd-1205.png)
*Reference: [XKCD 1205][xkcd1205]*

# Footnote

I hope this article has helped and can bring more nuance to the argument for releasing faster depending on the control your team has.

Just a small note on one approach that most teams can start with if they need to try stuff out to work out the costs they currently have. Try scripting every process, or doing it on a whiteboard, the goal here is to run this one script and the release should happen. For example: If you require approvals, you could have a script set up to email some team and let them click a link when to approve.


[xkcd1205]: https://xkcd.com/1205/
