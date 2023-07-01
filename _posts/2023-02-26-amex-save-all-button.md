---
layout: post
title:  "American Express (Amex) Enable All Offers Bookmarklet"
date:   2023-02-26 12:00:00
categories: bookmarklet tips amex lifehack
excerpt: "A piece of Javascript to enable all the offers on your Amex card."
---

The American Express website has many cashback 'offers' available. These offers allow you to gain cashback if you spend a certain amount in a shop.

This bookmarklet allows you to quickly enable all the offers in the list.

Drag the following link to the bookmark bar or right click and click 'Save to bookmarks':

**<a href='javascript: (function() {document.querySelectorAll(".offer-cta").forEach((item) => {if (item.title == "Save to Card"){ item.click(); }});}()); // Written by Niall Bunting - https://niallbunting.com '>Amex Enable All Offers</a>**

(Note: You do need to click the show more button to get the entire list of offers on the page.)

## Why should I use the bookmarklet?

* Don't miss a cashback offer you are eligible for by enabling all the offers available to you.
* Save your time. There are often 90+ offers in the list and it would take a while to enable them all.

## Privacy Implications

There are a couple of privacy implications to be aware of:

> To enable you to redeem the offer, American Express may share certain transaction data and the first digits of your Account number with the merchant to reconcile and assess the offer. For more information about how we share your information with the merchant, please review our Cardmember Privacy Statement.

> We will use your personal information such as name, email address, Account number and transaction information to manage your participation in the offer and to track your spend. Please see our Cardmember Privacy Statement for details of how we use your personal information.

I am still wondering if any data is shared when an offer is enabled and not redeemed. So have contacted the Amex Data Protection Officer and will update this post with the response.

#### Getting details about privacy implications

I found it pretty hard to find the details from the Amex website. I assumed data would be shared if an offer is redeemed, but was not sure what data is shared if the offer is enabled but not redeemed.

I had a look through the privacy document on the Amex website and couldn't find anything about the privacy implications of offers.

To confirm this I also spoke to a chat agent to figure out if the retailers get told if I enable cashback offers. I'm not sure the chat agent understood my question from the response below:

![](/assets/images/posts/amexchat202302.png)

A second representative did give me the privacy quotes above. Even though i'm not quite sure where the statement came from as I can't seem to find it in the Privacy Policy or on the Amex website.

## What is a Bookmarklet

A bookmarklet is a small piece of Javascript that gets executed when you press a bookmark. In this case written to save you some time, by clicking all the "Save To Card" links on the Amex page.
