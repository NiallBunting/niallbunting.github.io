---
layout: post
title:  "EBCDIC Character Format - A Guide"
date:   2019-10-23 18:00:00
categories: EBCDIC Cobol packing copybooks
---

This aims to explain what EBCDIC is and give an overview how to use it. If you want to read about it's history have a look at the [wiki page][wikipage] (also take a look at the joke section).

This post is mainly going to deal with fixed width EBCDIC records.

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

### EBCDIC Basics

At it's heart EBCDIC is just a character encoding, in simple terms that is how we map a number onto character as computers only store numbers i.e. 61:a, 62:b, 63:c.

There are multiple different versions of EBCDIC that are inoperable with each other, the different formats are defined by their code pages, and they are all different so you should check which one your project uses.

Here is an example of a fixed width record (in ASCII for readability).

{% highlight text %}
00000001Niall     2
00000002Martin    9
{% endhighlight %}

As you can see in the data, there is no schema baked into this record, so if you received this file you would not know how to parse it. 

The schemas are stored in separate files called copybooks, there are two main ways these records can be composed, either fixed or variable width records. The difference between these is how a record is formatted. A fixed width record will always have the exact same length e.g. fixed width of 512 bytes, means each record would be that length even if it was just a name. 

Another thing to highlight, if you convert to ASCII the numbers just look like strings, rather than in a specific number format.

#### EBCDIC Packing

EBCDIC may store the numbers as strings, however sometimes it uses different characters than 0-9. These values are called packed and is how EBCDIC encodes a positive or negative number, if the schema defines the number to be packed. 

This allows us to set the sign and the value that the number should be. This is clever as it allows us to both store a number and sign in one byte, rather than taking two bytes to do the same operation.

Packing uses nibbles (4 bits) of a byte rather than using the full byte. To store the information about a given number. 

With the values:
  * F - unsigned
  * C - positive
  * D - negative

I recommend looking at this [simotime.com][simotime] page if you want to find out more about packing.

### EBCDIC Copybooks

Let's start off showing a fictional fixed width copybook.

```
      ********************************************
      * An Example Copybook
      ********************************************

        01  RECORD.
          10  ID                   PIC X BINARY.
          10  INTEGER              PIC 9.
          10  DECIMAL              PIC 99V99.
          10  FOURCHAR             PIC X(4).
          10  PACKEDNUMBER         PIC S999.
          10  COMPLEXNUMBER        PIC S9V9.
          10  FILLER               PIC X(50).
```

The spaces are important as that is a different section that is reserved for things such as comments.

Next thing are the numbers these define the hierarchy of the copybook. In this example you have the top-level record and then all the fields contained with in it. Other uses could be and Address field that splits the Line 1, Line 2, and Country. Into sub sections. The numbers themselves don't actually matter, just needs to be larger than the parent.

The next line is the name of the field.

### PIC

PIC is the next thing we come across, this just tells the copybook how to interpret the data in this case using the value defined by the following number. Where `XXXX` or `X(4)` would be four characters.

The basic types are the following:

There are two main types:
* X : Any character
* 9 : An integer

These fields then are specific modifiers for specific behaviour.

There are also some special type information:
* S : The field is packed
* (n) : for this length.
* V : A decimal

That contains most of the info for most of the records, however sometimes there are additional fields such as `BINARY` in this example. There are many different format for more specific use cases.

#### Filler

In fixed width records filler is often used with the record name being `FILLER`. This is for future expansion or spaces in the data where other companies may use and you should just ignore. The Cobrix library will just completely ignore these sections and you can have multiple name `FILLER`.

### Convert ASCII to EBCDIC

The Unix command:
{% highlight bash %}
iconv -f ASCII -t EBCDICUK <filename>
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
iconv -f ASCII -t EBCDICUK <filename>
{% endhighlight %}

I piped this output into `hexdump` and gave me the following. The hex is the data and the data between the `|` is what it looks like is ASCII.
{% highlight hex %}
f0 f0 f0 f0 f0 f0 f0 f1  d5 89 81 93 93 40 40 40  |.............@@@|
40 40 f2 25 f0 f0 f0 f0  f0 f0 f0 f2 d4 81 99 a3  |@@.%............|
89 95 40 40 40 40 f9 25                           |..@@@@.%|
{% endhighlight %}

### Reading EBCDIC with a Spark Cluster

Due to the complexities mentioned above I would recommend using the [Cobrix library][cobrix]. This has been developed and made open source by [Absa][absa] which is a South African financial services group.

The first thing you are going to need to do is add the latest version of Cobrix library to your spark instance.

Once you have Cobrix installed you just need to read in your data and copybook, the library handles the rest. Cobrix returns a formatted Dataframe that can be worked on as normal.

```
spark
  .read
  .format("cobol")
  .option("copybook", "data/copybook.cob")
  .load("data/testdata")
```



[wikipage]: https://en.wikipedia.org/wiki/EBCDIC
[cobrix]: https://github.com/AbsaOSS/cobrix
[absa]: https://www.absa.co.za/
[simotime]: http://simotime.com/datapk01.htm