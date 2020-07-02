---
layout: post
title:  "How the velocity estimator works"
date:   2020-06-25 12:00:00
categories: velocity calculator daily
---

Many software teams track their velocity, use [this handy calculator][calculator] to discover your chances of delivering a certain amount of story points.

Lets talk about the velocity calculator works behind the scenes.

![](/assets/images/daily/2020-06-25-velocity-calculator.png)

## The Idea

I saw a forecast diagram with a growing cone, for the number of features to be delivered over the course of the project (like the one above) and started to wonder how that was calculated. Was the lower and upper bounds plucked out of thin air or did they use a model? I had a search and couldn't find anything so devised one myself.

## Major Concepts

We feed your previous velocities into the [Student's _t_-distribution][studentst]. I settled on using this distribution after a fair amount of research and trial error of which distribution to use. Mainly because this allows the use of small sample size compared so something like the normal distribution.

It calculates the mean, the confidence interval and the distribution curve (displayed in the table).

The confidence interval is really a best guess at the segment that contains the population mean based on how confident you wish to be.

The distribution curve shows for a given number of points the estimated chance of delivering them. It’s probably my favorite aspect as I like viewing the chances of us to deliver certain amounts of points. It would be interesting in a planning session to say that is a 10% risk if we bring in those points.

Back to the distribution it’s not perfect as we will see below.

### Assumptions

This model has some baked in assumptions:

1. The underlying distribution is normal curve.
2. That the scale of measurement is continuous.
3. It’s a random sample.
4. The population mean doesn't change.

For the first point, I have assumed here that teams deliver in a normally distributed fashion. It would be interesting to actually graph some long running data (I might do that in a future blog post if I can get my hands on good data).

I’m not sure if the scale is continuous or not. As often the Fibonacci scale is used to point items which itself isn't continuous. However, it’s "more continuous" (I might be showing the limits of my stats knowledge here) than the scores in rugby as you could complete multiple stories with a value of one, whereas in rugby some numbers such as 1 are impossible to score.

I’m not sure if the last couple of sprints is the best random sample, as they are likely to be influenced by similar factors. On the other hand, as point four touches on, we normally assume population mean (base velocity) doesn’t change. Whereas we know the velocity does change over time; if the velocity is actually changing (hopefully getting better) then a sprints velocity from a long time ago is not good data either.

## Overall Thoughts

I think the calculator probably has some problems with its statistical model, but for the accuracy required from it, we can kick the problems into the long grass in my opinion.

[calculator]: /sprint-forecaster/
[studentst]: https://en.wikipedia.org/wiki/Student%27s_t-distribution

