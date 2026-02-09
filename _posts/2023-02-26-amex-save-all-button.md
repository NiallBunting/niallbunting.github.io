---
layout: post
title:  "American Express (Amex) Enable All Offers Bookmarklet"
date:   2023-02-26 12:00:00
categories: bookmarklet tips amex lifehack
excerpt: "A piece of Javascript to enable all the offers on your Amex card."
---

The American Express website has many cashback offers. These offers give you cashback if you spend a certain amount at a shop.

This bookmarklet lets you quickly enable all the offers in the list.

Drag the following link to your bookmarks bar or right-click and choose "Save to bookmarks":

**<a href='javascript: (function() {document.querySelectorAll(".offer-cta").forEach((item) => {if (item.title == "Save to Card"){ item.click(); }});}()); // Written by Niall Bunting - https://niallbunting.com '>Amex Enable All Offers</a>**

(Note: You do need to click the show more button to get the entire list of offers on the page.)

## Why should I use the bookmarklet?

- Don't miss a cashback offer you are eligible for by enabling all the offers available to you.
- Save time. There are often 90+ offers in the list and it would take a while to enable them all.

## Privacy Implications

There are a couple of privacy implications to be aware of:

> To enable you to redeem the offer, American Express may share certain transaction data and the first digits of your Account number with the merchant to reconcile and assess the offer. For more information about how we share your information with the merchant, please review our Cardmember Privacy Statement.

> We will use your personal information such as name, email address, Account number and transaction information to manage your participation in the offer and to track your spend. Please see our Cardmember Privacy Statement for details of how we use your personal information.

I am still wondering if any data is shared when an offer is enabled but not redeemed, so I have contacted the Amex Data Protection Officer and will update this post with their response.

#### Getting details about privacy implications

I found it difficult to locate details on the Amex website. I assumed data would be shared when an offer is redeemed, but I wasn't sure what — if any — data is shared when an offer is merely enabled and not redeemed.

I looked through Amex's privacy document and couldn't find anything about the privacy implications of offers.

To confirm this, I also spoke to a chat agent to ask whether retailers are notified when I enable cashback offers. I'm not sure the agent understood my question, judging by the response below:

![](/assets/images/posts/amexchat202302.png)

A second representative did provide the privacy quotes above, although I'm not sure where that statement came from because I can't find it in the Privacy Policy or elsewhere on the Amex website.

## What is a Bookmarklet

A bookmarklet is a small piece of JavaScript executed when you click a bookmark. This one saves you time by clicking all the 'Save to Card' links on the Amex page.
