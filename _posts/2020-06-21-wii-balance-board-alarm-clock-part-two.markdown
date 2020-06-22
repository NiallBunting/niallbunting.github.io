---
layout: post
title:  "Wii Balance Board Alarm Clock - Raspberry Pi and initial setup"
date:   2020-06-21 12:00:00
categories: wii balance board alarm clock daily
---

_This is the second part of this series, [the first post is here][firstwiipost]._

It seemed to me that this project would require a microcontroller. Especially as I planned to use both the Bluetooth and Wi-Fi stacks. Which isn’t something I fancy implementing in hardware for this project.

I played around with the idea of using an Arduino for this project but thought it would throw up too many difficulties as it seemed to be too low level for this project.

This lead me choosing the Raspberry Pi Zero W. The Raspberry Pi Zero is a cheap, absolutely tiny, fully working computer. Importantly for this project, it also has Bluetooth for the connection to the board and Wi-Fi to connect to the internet.

With that decided I did some googling and found [this Hackaday post][hackaday] where Jeff Loucks has made a smart scale out of a Wii Fit. This seemed like a great start, so I decided to give that a go.

First, I needed to set up the PI. This involved downloading the Raspbian machine image and flashing it to the Micro SD card. As part of this step I needed to make the Pi headless (as I didn’t have the cables to use it otherwise) this meant adding a few files (wpa_supplicant.conf and ssh) to auto setup the Wi-Fi and enable SSH. Allowing me to connect to it over the network.

Once the SD card was flashed, I popped it into the Pi the SD card in waited for the little computer to boot with excitement and trepidation. Logging into the routers configuration page I saw it join the network, so using the IP connected via SSH to the Pi.

On the Pi, I downloaded the code provided on [the Hackaday post][hackaday] (needing to install git and a few other utilities beforehand).

I ran the Python script and switched on the board and pressed the sync button. Success. It was measuring the weight I placed on the board.

Now I just need to get a buzzer working and also make it turn on the board and connect automatically.

![](/assets/images/daily/2020-06-20-wii-fit-alarm-above.jpg)

[firstwiipost]: /wii/balance/board/alarm/clock/daily/2020/06/17/wii-balance-board-alarm-clock-part-one.html
[hackaday]: https://hackaday.io/project/164123/instructions
