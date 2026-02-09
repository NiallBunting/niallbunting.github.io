---
layout: post
title:  "Google Sheets Habit Tracker"
date:   2020-06-14 12:00:00
categories: google sheets habit tracker daily
---

I have created a simple habit tracker using Google Sheets which you can find [here][docslink].

For getting started see the [getting started section](#gettingstarted).

## Main Sheet

This is the main page of the habit tracker. It's where you enter your tasks as you complete your daily and weekly tasks. Most of the time you will just be entering in for the current date (highlighted in orange) ether a 'Y' or 'N' in the daily section and either '1' or '0' in the weekly section.

The yellow cells display your current streak of the habit. If you miss a day/week this gets reset.

This page also contains some setup values covered in the getting started section.

![](/assets/images/habit-tracker-main.png)

## Year Overview

This is probably my favorite page of the habit tracker. It lets you see your entire year in a really easy to parse way.

This is done completely automatically pulling the values from the main page.

![](/assets/images/habit-tracker-overview.png)

## <a name="gettingstarted"/>Getting Started

To get started just open up the sheet and make a copy.

You will need to change a couple of values.

On the main sheet:

1. The blue date will need changing to the first Monday of a week you want to start your habits. This will then update all the dates to be of the relevant time.
2. For the week tasks how many times you wish to do the task in a given week. This will then turn your habit green when that number is reached.
3. The number in cell Q1. This is the count of how many habits you are currently completing and changes the conditional formatting.


## Link

Find the link [here][docslink].

## Contributing/Updates

I'm going to make updates to this as I use it myself and always think of ways to improve it.

If you have any ideas how to improve it or find any bugs let me know at habittracker (at) niallbunting.com.




[docslink]: https://docs.google.com/spreadsheets/d/144kysHeWuxtcR-sqeVF-8f_KCtCag0D91EDW9mrwPR4/edit?usp=sharing

