---
layout: post
title:  "Lottery Odds: Jackpot Rolldown Edition"
date:   2020-06-23 12:00:00
categories: probability lottery daily
---

Does this special game event mean it’s time to play the lottery? Let’s break out the statistics to find out.

![](/assets/images/daily/2020-06-23-lottery.png)

Tomorrow in the UK we have a special case of the ‘Lotto’ called a Jackpot Rolldown. This means that if nobody wins the jackpot (matching 6 numbers) the entire 12.8M jackpot will be shared between all other winners. 

> If no one matches all 6 main numbers in a Must Be Won draw, the Jackpot will be shared by all cash winners, so they’ll win an even bigger prize.
> 
> For example, that could mean winning £100 for matching 3 main numbers instead of £30!
>
> <cite>-- national-lottery.co.uk</cite>

I’m interested to see how this affects the expected value aka how much you gain each time you play. For example, Roulette has an expected value of 0.947% (on red/black) so for every £1.00 spent you can expect to receive £0.95 back.

## Assumptions

* Nobody wins the jackpot (including us on the rolldown).
* The payout on Match 3 is exactly £100.
* All ‘Free lucky dips’ lose or win after one more draw.
* Free lucky dips can win the jackpot and it’s the same value.
* Lottery costs £2 to play.
* Don't have to share prizes (essentially everyone else enters but loses).
* My statistics skills can handle this and I haven't made a mistake.

## Gathering the data

From the marketing material we can gather values that are relevant for tomorrows game:

* Jackpot is £12,800,000 (12.8M).
* Match 3 will get you £100 rather than the £30.

We need to gather more data from the depths of the [lottery procedures page][lotteryrules], giving us the following table.


| Prize Categories      | Approximate Odds of Winning | Prize          | Jack Pot Rolldown |
|-----------------------|-----------------------------|----------------|-------------------|
| Match 6 / Jackpot    | 0.0000000221938762          | Jackpot        | N/A               |
| Match 5 + Bonus Ball | 0.0000001331632572          | £1,000,000     | 3%                |
| Match 5              | 0.000006924488453           | £1,750         | 6%                |
| Match 4              | 0.0004587155963             | £140           | 17%               |
| Match 3              | 0.0103950104                | £30            | 74%               |
| Match 2              | 0.09708737864               | Free Lucky Dip | N/A               |

## Calculating the new prizes

We can work out the other roledowns total prize pool by assigning that percent of the jackpot to the each of the possible rolldowns. However, to work out how much this increases each individual prize we need to estimate how many people we expect to win each prize.

Therefore, we need to estimate how many tickets will be sold. This can be done by using the size of the prize pool for Match 3 and the £70 increase of the usual prize value.

```
Estimated Entries = ( Match 3 rolldown) / (Match 3 prize increase) / (Match 3 chance of winning)
Estimated entries = (9472000 / 70) / 0.0103950104 = 13,017,234
```

With this calculated, just use the chance of winning to estimate how many people will be sharing the prize pot and how much that increases their prize:

| Prize Categories      | Total Rolldown | Prize Increase | Total Prize |
|-----------------------|----------------|----------------|-------------|
| Match 5* + Bonus Ball | 384000         | 221527.728     | £1,221,528  |
| Match 5*              | 768000         | 8520.298365    | £10,270     |
| Match 4*              | 2176000        | 364.4153509    | £504        |
| Match 3*              | 9472000        | 70             | £100        |

## Lucky Dip

The lucky dip allows us to play again in the next draw with random numbers. We can just use the expected value of regular draw for calculating this. Reducing it by the fact that we need to win a lucky dip on the initial draw first.

## Expected value

The expected value is made up of two parts the winnings that you expect to win minus the wager required you expect to lose.

For the roulette example this is:
```
P(Red) * (Value of X for Red) + P(Not Red) * (Value of X for Not Red) = (18/38 * 1) + (20/38  * -1) = -0.053.
```

For the lottery we can do this for each prize type, then sum them to get the overall positive value. We can also calculate the cost of playing the game and the chance that we will lose.

## Results


It seems overall, we have (remember it costs £2 to play):

| Draw                                       | Expected Return |
|--------------------------------------------|-----------------|
| Rolldown (no jackpot)                      | £1.80           |
| Regular (or rolldown with claimed jackpot) | £1.10           |

These values seem sensible to me as they say that about 50% of the value of the ticket are paid out as prizes.

At about 15.5M the expected return turn positive (assuming everything else stays the same). Maybe this is why they have rolldowns to stop this from happening even though it would be a good story.

This means that a rolldown (with all the assumptions) would have slightly better odds than the roulette table. Ignoring the fact that with this amount of entries we should expect a 29% chance that someone wins.

As other people are likely to share our numbers and therefore prizes these results would get worse.

It seems like once again the roulette table has won, it seems you really can't beat the house.

## Resources

There are likely errors in these calculations feel free to point them out. You can find the spreadsheet I used [here][spreadsheet].

[lotteryrules]: https://www.national-lottery.co.uk/games/lotto/game-procedures
[spreadsheet]: https://docs.google.com/spreadsheets/d/1y817IsyF9hRF_Tndg2_pob41YmBxWP5-npUW7v62Qxc/edit?usp=sharing

