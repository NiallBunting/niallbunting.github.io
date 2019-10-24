---
layout: post
title:  "EBCDIC Format - How it works"
date:   2019-10-23 18:00:00
categories: EBCDIC Cobol packing cobybooks
---

This aims to explain what EBCDIC is and how to use it. If you want to read about it's history have a look at the [wiki page][wikipage] (also take a look at the joke section).

This post is only going to deal with fixed width EBCDIC records.

### Contents
1. [EBCDIC in five bullet points](#ebcdic-in-five-bullet-points)
2. [EBCDIC Basics](#ebcdic-basics)
3. [EBCDIC Copybooks](#ebcdic-copybooks)
3. [Convert ASCII to EBCDIC](#convert-ascii-to-ebcdic)
4. [Reading EBCDIC with a Spark cluster](#reading-ebcdic-with-a-spark-cluster)

### EBCDIC in five bullet points

* EBCDIC is a 'legacy' encoding format. 
* It has many sets that are not compatible with each other.
* Uses an 8 bit character set.
* Incompatible with ASCII.
* Still in usage in finance sector (2019).

![](/assets/images/ebcdicusage.jpg)
*"If we use EBCDIC, does that count as encryption? No one can read that format."*

## EBCDIC Basics

### EBCDIC Packing

## EBCDIC Copybooks

Copybooks are used to define the schema for an EBCDIC format. It defines the length and the format of the field.

There are two main types:
* X : Any character
* 9 : An integer

There are also some special type information:
* S : The field is packed
* (n) : for this length.

## Convert ASCII to EBCDIC

The Unix command:
{% highlight bash %}
iconv -i ASCII -O EBCDICUK
{% endhighlight %}

#### An Example

The easiest way to create some EBCDIC to test with is to create a file in ASCII following the fixed width format.

This is our COBOL EBCDIC definition.

{% highlight cobol %}
  01 RECORD
    05 ID   9(8)
    05 NAME X(10)
    05 HATS S99
{% endhighlight %}

Here is our data.

{% highlight text %}
00000001Niall     2
00000002Martin    9
{% endhighlight %}

To convert the following to file use the following command. If you are following this guide to parse the EBCDIC using Spark, you don't need to worry about the spaces as they will be stripped by the library.

{% highlight bash %}
iconv -i ASCII -O EBCDICUK
{% endhighlight %}

As you can see below the data has been turned into this:
{% highlight hex %}
<PASTE THE OUTPUT HERE>
{% endhighlight %}

## Reading EBCDIC with a Spark Cluster

[wikipage]: https://en.wikipedia.org/wiki/EBCDIC
