---
layout: post
title:  "Wii Balance Board Alarm Clock – Software and Setup"
date:   2020-08-16 12:00:00
categories: wii balance board alarm clock daily
---

_This is the fourth part of this series; [the first post is here][firstpost]._

This part covers the software and setup for the Wii balance board alarm clock project.

## The brief

The main requirement for this project is that it acts as an alarm, requires me to stand on the board for a given length of time (60 seconds), and records and stores my weight.

Here is a flow diagram for my requirements:

![](/assets/images/posts/wii-board-flow.png)

## Code

The code can be [found here on Github][code]. It’s not production ready, it works and meets the requirements, but won't win any awards.

### Bluetooth

The Raspberry Pi needs to connect over Bluetooth to the Wii Fit Board. The basic code for this part was found via a [Hackaday project][hackaday]. I forked the repository and used that as a base for this project.

### Running the code

To run the code, use the command `python alarm.py`.
For alarm purposes, I call the script via a cron job for easy scheduling.

## Setup

### Install the requirements

You will need to install the required packages using `pip install`. At the moment there isn’t a `requirements` file, so I suggest you run the script and install missing dependencies until it stops complaining.

### Scheduling

Cron is a service that runs scheduled commands. This means that we can set the script to be run at the same time every morning.

To edit the crontab, run:

`crontab -e`

I currently have a 07:00 alarm, so I appended the following line to the file that opens:

`0 7 * * * /usr/bin/python2.7 /home/pi/wii-alarm-clock/alarm.py`

If you want multiple times or specific days of the week, there are many references about more complex crontab expressions online. There are also websites that provide a GUI for generating entries.

### Google Sheets

I decided to upload the data to a Google spreadsheet because it's free and easy. This was done using the `gspread` library for Python, which hooks into Sheets via an API allowing CRUD operations.

You will need to [follow the Gspread instructions][gspread] to obtain a client secret. Once you have the secret and have ensured it has access to the sheet, edit the script to add the path to your secret. You will also need to add the sheet ID.

#### The Sheet

You will need to set your sheet up like the following:

![](/assets/images/posts/wii-balance-sheet-headers.png)

The date in B1 should be the first date this will be used, as that’s used to calculate which row an entry should be on. This currently limits the sheet to holding one value per day.

## Working Software

I found a few minor bugs after a couple of days of use; these have now been fixed.

Overall, this was relatively trivial to set up; the hardest part was making the Google API token work correctly, since it initially didn't seem to have the correct access to the spreadsheet.

[firstpost]: /wii/balance/board/alarm/clock/daily/2020/06/17/wii-balance-board-alarm-clock-part-one.html
[hackaday]: https://hackaday.io/project/164123/instructions
[code]: https://github.com/NiallBunting/wii-alarm-clock
[gspread]: https://gspread.readthedocs.io/en/latest/oauth2.html#enable-api-access-for-a-project
