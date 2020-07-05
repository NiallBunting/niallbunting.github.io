---
layout: post
title:  "Wii Balance Board Alarm Clock – Closing the lid"
date:   2020-07-04 12:00:00
categories: wii balance board alarm clock daily
---

_This is the fourth part of this series; [the first post is here][firstpost]._

I was nervous, as previous projects have gone wrong at this stage. As things are made permanent, if a problem arises it’s much more difficult to fix, as it’s harder to pull connections to find the issue.

![](/assets/images/daily/2020-07-04-with-lid.jpg)

## Getting off the breadboard

The first step was to carefully mirror each electrical connection on something other than a breadboard. In this case I decided to use [perfboard][perfboard]. Perfboard is made from the same materials as a PCB but instead of forming circuits it has a grid of pads that you connect yourself.

In my case I had perfboard with horizontal rows of connections, this meant that I occasionally had to cut a ridge in the board to break the row. For example, the screw holding the board down would have bridged three rows.

At this stage I decided to use female connectors on Pi header pins, this allows me to remove the Pi in future if required.

I constantly tested my project through this process, to try and catch any mistakes early, luckily enough I pulled it off without any problems arising. Maybe because it's such a simple circuit.

## Cut and glue

With circuit completed, I needed to make sure it would fit inside the balance board. As the space was just big enough between the reinforcing plastic inside the board.

The orientation of the Pi meant that a few header pins were separated by the reinforcements. This caused a problem when I connected the Pi to the perfboard, as the separated pins required a connector causing them to no longer fit either side of the ridge. Therefore, I slightly shifted the Pi across and increased the size of the hole in the battery holder to allow the USB cable to connect to the PI.

Once it looked like it would all fit, I hot glued a piece of plastic into a corner and used a screw to hold the perf board and the raspberry Pi in place. It does flex slightly on the other side, but overall I thought it was good enough as it's not going to be moving too much.

![](/assets/images/daily/2020-07-04-no-lid.jpg)

## Closed

With the electronics in place, I just needed to put the board back together, it was at this stage I drilled a hole in the battery cover allowing me to pass the USB cable through.

I gave it a test and success. You can see it working in the bonus video below.

Now i just need to finish the software and we will have a working alarm.

__Bonus__: here is a video of the closed board:
<iframe width="560" height="315" src="https://www.youtube.com/embed/h7Tl9O--0gU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[firstpost]: /wii/balance/board/alarm/clock/daily/2020/06/17/wii-balance-board-alarm-clock-part-one.html
[perfboard]: https://en.wikipedia.org/wiki/Perfboard

