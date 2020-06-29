---
layout: post
title:  "Should I use an NPN or PNP transistor?"
date:   2020-06-29 12:00:00
categories: npn pnp transistor daily
---

Many of the articles that were read to research this topic, went into the minute details of how a NPN and PNP transistor is born (and back) but didn't seem to answer my question. Why should I use one and not the other?

![](/assets/images/daily/2020-06-29-which-transistor-header.png)

This article aims to answer this question in a way that I can understand and only covers switching. I’m also going to purposely avoid talking about silicon in this post. _Warning: i'm a beginner and am only [covering basic switching][wiialarm]._

## BJT Transistors

NPN and PNP transistors are types of [Bipolar Junction Transistors][bjt]. All BJT transistors are current driven, this means they depend on the amps passing through them to open and close the switch. (MOSFETs are a voltage driven transistor, but we won't talk about them here.)

Here is a circuit diagram of the two types:

![](/assets/images/daily/2020-06-29-npn-pnp-circuit-diagram.png)
*The arrows point the direction of current in a PN junction. Notice the collector and emitter have moved.*

 
As you can see the NPN transistors are controlled by a positive voltage on the base and PNP transistors are controlled by a negative voltage on the base.

As mentioned above, the resistor requires current flowing for control. Unfortunately, for us software developers the real world isn’t binary, and as current ramps up on a transistors base it’s like opening a tap. With no current (tap closed) no current passes between the collector and the emitter. As you start to add current to the base (start to open the tap) the current passing between the collector and the emitter starts increasing (more water comes out). At a certain point the limiting factor becomes the voltage (pressure in the pipe) and supplying more current to the base (opening the tap more) will not increase the flow between the collector and the emitter (more water won't come out). At this final stage the transistor is said to be saturated.

Knowing these facts caused me to think about transistors being more like variable resistors, that you can turn up and down.

## Which type should we use?

For switching applications, you should use NPN if it’s a low-side switch or PNP if it’s a high side switch. As using the other one will cause issues such as excessive current draw (and even more complex issues I’ve been told). This is because you will need to have current flowing in odd directions through the transistor.

That sentence is as deep as I currently understand, and it makes sense. It seems that it’s just a fact, that using the correct tool for the job reduces the amount of current draw, allowing your circuit can live a happy low current lifestyle.

#### That’s a pathetic answer; I want more detail!

Using [this great page][npmusedmore] you can see that there are a number of advantages such as faster speed, lower cost, lower resistance and you can connect the grounds. (I’m not what fast means in this scenario and what would be considered slow, I’m guessing compared to us humans they are going to mighty fast either way.)

However, this caught my eye:
> As a quick rule of thumb, if you are turning a device on and off, a low-side switch is a simple solution. However, if you are delivering power to an entire circuit or a voltage sensitive device, then you want to use a high-side switch.
>
> -- <cite>[Bald Engineer][baldenginner]</cite>

## The resistor

Just a note about the resistor that's required when driving a transistor from a microcontroller.

Transistors, in theory, can draw unlimited current via the base, in real life though they will end up causing a fire before that happens. Therefore you need to make sure you reach saturation levels but don’t supply additional current as it becomes a waste.

You can do this with a resistor, you just need to find your saturation current from the transistor datasheet. Then use Ohm’s Law to work out the required resistance (you need as you know the voltages you are working with) and pick a resistor that is close to that value.

## Special Thanks

I want to say special thanks to [Ross Bamford][rosco] for helping a beginner get his heard around some of these concepts. If you check out his [website][rosco] you will also see the computer that he has built.

[baldenginner]: https://www.baldengineer.com/low-side-vs-high-side-transistor-switch.html
[npmusedmore]: https://www.etechnog.com/2019/06/npn-transistors-mostly-used-than-pnp.html
[bjt]: https://en.wikipedia.org/wiki/Bipolar_junction_transistor
[rosco]: https://rosco-m68k.com/ 
[wiialarm]: /wii/balance/board/alarm/clock/daily/2020/06/17/wii-balance-board-alarm-clock-part-one.html
