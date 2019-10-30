---
layout: post
title:  "EBCDIC Character Format - A Guide"
date:   2019-10-23 18:00:00
categories: EBCDIC Cobol packing cobybooks
---

This aims to explain what EBCDIC is and how to use it. If you want to read about it's history have a look at the [wiki page][wikipage] (also take a look at the joke section).

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

There are multiple different layouts that are inoperable with each other, as they are all slightly different.

EBCDIC contains data that has a schema, sort of data in a database record. Each record contains the data for a row in the table.

The schemas are stored in separate files called copybooks, there are two main ways these records can be composed, either fixed or variable width records. The difference between these is how a record is formatted. A fixed width record will always have the exact same length e.g. fixed width of 512 bytes, means each record would be that length even if it was just a name. 

PICTURE HERE OF A FIXED WIDTH.?

NUMBERS ARE STORED AS CHARs?

#### EBCDIC Packing

This is a method that EBCDIC uses to store the sign of a given number (if it's positive or negative).

How this works is rather than storing a number we store one of the following characters. This allows us to set the sign and the value that the number should be.

This is clever as it allows us to both store a number and sign in one byte, rather than taking two bytes to do the same operation.

This table shows the characters and the sign and the number they represent.

LASTVALUE DOES THAT MEAN ITS THE LAST VALUE?

```
Value | Sign | Last Value
{     | +    | 0
A     | +    | 1
B     | +    | 2
C     | +    | 3
D     | +    | 4
E     | +    | 5
F     | +    | 6
G     | +    | 7
H     | +    | 8
I     | +    | 9
}     | -    | 0
J     | -    | 1
K     | -    | 2
L     | -    | 3
M     | -    | 4
N     | -    | 5
O     | -    | 6
P     | -    | 7
Q     | -    | 8
R     | -    | 9
```


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

WHAT DOES PIC MEAN?

WHAT DOES BINARY DO?

FILLER?

Copybooks are used to define the schema for an EBCDIC format. It defines the length and the format of the field.

There are two main types:
* X : Any character
* 9 : An integer

There are also some special type information:
* S : The field is packed
* (n) : for this length.
* V : A decimal

### Convert ASCII to EBCDIC

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

### Reading EBCDIC with a Spark Cluster

Due to the complexities mentioned above I would recommend using the [Cobrix library][cobrix]. This has been developed and made open source by [Absa][absa] which is a South African financial services group.

The first thing you are going to need to do is add the latest version of Cobrix library to your spark instance.

Once you have that installed you just need to read in your data and the library handles the rest. Reading in your data and returning a dataframe.

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
