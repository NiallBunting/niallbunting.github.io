---
layout: post
title:  "Wii Balance Board Alarm Clock – Software and Setup"
date:   2020-08-16 12:00:00
categories: wii balance board alarm clock daily
---

_This is the fourth part of this series; [the first post is here][firstpost]._

This part covers the software and setup for the Wii balance board alarm clock project.

## The brief

The main requirement for this project is for it to act as an alarm, require me to stand on the board for a given length of time (60 seconds) and record and store my weight.

Here is a flow diagram for my requirements:

![](/assets/images/posts/wii-board-flow.png) 

## Code

The code can be [found here on Github][code]. It’s not production ready, it works and meet the requirements, but won't win any awards.

### Bluetooth

The Raspberry Pi needs to be able to connect over Bluetooth to the Wii Fit Board. The basic code for this part was found via a [Hackaday project][hackaday]. I then forked the repository, and used that as a base for this project.

### Running the code

To run the code, use the command `python alarm.py`.
For alarm purposes I call the script via a cron job for easy scheduling.

## Setup

### Install the requirements

You will need to install all the imports using `pip install`. At the moment there isn’t a `requirements` file, so I suggest you run the file, installing missing dependencies, until it doesn’t complain.

### Scheduling

Cron is a service that runs scheduled commands. This means that we can set the script to be run at the same time every morning.

To edit the crontab run:

`crontab -e`

I currently have a 07:00 alarm therefore I appended the following line in the file that opens:

`0 7 * * * /usr/bin/python2.7 /home/pi/wii-alarm-clock/alarm.py`

If you want have multiple times or days of the week there are many references about more complicated crontab online. There are also websites which will allow you to choose from a GUI.

### Google Sheets

I decided to upload the data to a Google spreadsheet as it's free and easy. This was done using the `gspread` library for python, as this hooks into the sheets via an API allowing you to perform CRUD operations.

You will need to [follow the Gspread instructions][gspread] for receiving a client secret. Once you have the secret and given made sure it has access to that sheet, you will need to edit the script to add the path to your copy of your secret. You will also need to add the id for the sheet name.

#### The Sheet

You will need to set your sheet up like the following:

![](/assets/images/posts/wii-balance-sheet-headers.png) 

The date in B1 should be the first date this will be used, as that’s used to calculate which row an entry should be on. This currently limits the sheet to holding one value per day.

## Working Software

A few minor bugs were found out after a couple of days use, which have now been fixed.

Overall, this was relatively trivial to set up, with the hardest part being making the Google API token work correctly. As initially it didn’t seem to have the correct access to the spreadsheet. 

[firstpost]: /wii/balance/board/alarm/clock/daily/2020/06/17/wii-balance-board-alarm-clock-part-one.html
[hackaday]: https://hackaday.io/project/164123/instructions
[code]: https://github.com/NiallBunting/wii-alarm-clock
[gspread]: https://gspread.readthedocs.io/en/latest/oauth2.html#enable-api-access-for-a-project
