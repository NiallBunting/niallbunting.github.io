---
layout: post
title:  "EBCDIC Character Format - A Guide"
date:   2019-12-09 18:00:00
categories: EBCDIC Cobol packing copybooks
---

This aims to explain what EBCDIC is and give an overview of how to use it. If you want to read about its history, have a look at the [wiki page][wikipage] (also take a look at the joke section). This post also includes the command to convert EBCDIC Cobol to ASCII.

This post mainly deals with fixed width EBCDIC records. We will also briefly cover reading EBCDIC into an Apache Spark cluster using the Cobrix library.

### Contents

1. [EBCDIC in five bullet points](#ebcdic-in-five-bullet-points)
2. [EBCDIC Basics](#ebcdic-basics)
3. [EBCDIC Copybooks](#ebcdic-copybooks)
4. [Convert ASCII to EBCDIC](#convert-ascii-to-ebcdic)
5. [Reading EBCDIC with a Spark cluster](#reading-ebcdic-with-a-spark-cluster)

### EBCDIC in five bullet points

* EBCDIC is a 'legacy' encoding format. 
* It has many sets that are not compatible with each other.
* Uses an 8 bit character set.
* Incompatible with ASCII.
* Still in usage in finance sector (2019).

![](/assets/images/ebcdicusage.jpg)
*"If we use EBCDIC, does that count as encryption? No one can read that format."*

### EBCDIC Basics

At its heart, both EBCDIC (Extended Binary Coded Decimal Interchange Code) and ASCII (American Standard Code for Information Interchange) are methods of character encoding. In simple terms, they translate a binary number sequence into letters and numbers: e.g. 61 = a, 62 = b, 63 = c.

EBCDIC uses an 8-bit (one byte) character encoding, which is different from ASCII that uses 7-bit encoding.

EBCDIC is used to encode the Latin character set. However, there are multiple versions of EBCDIC that are incompatible with each other. The different formats are defined by their code pages, and I recommend checking which one your project uses.

Here is an example of a fixed width record (in ASCII for readability).

{% highlight text %}
00000001Niall     2
00000002Martin    9
{% endhighlight %}

As you can see, there is no schema embedded in this record, so if you received this file you would not know how to parse it.

The schemas are stored in separate files called copybooks. Records can be composed in two main ways: either fixed or variable width. Fixed width records always have the exact same length (e.g. 512 characters), whereas variable width records can have different lengths.

When you convert EBCDIC to ASCII encoding, the numbers are stored as character strings rather than in a numeric format. This means numbers consume more space since each digit is stored separately.

#### EBCDIC Packing

EBCDIC uses an 8 bit character set, meaning that every row of an EBCDIC file can be read as a string. With an emphasis on minimizing field widths, EBCDIC employs a technique where the sign (positive or negative) is encoded as part of the string, changing the least significant digit from a number to a non-numeric character. This saves space by converting the four-character string "-100" to the three-character string "10}".

Packing uses nibbles (4 bits) rather than full bytes to store numeric information.

With the values:
  * F - unsigned
  * C - positive
  * D - negative

This can also be viewed from the 8 bit perspective, giving you the following table:

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

[simotime.com][simotime] is a good reference to find out more about packing.

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

The layout of a copybook follows Cobol's file layout rules. This means columns have specific purposes and must be followed correctly.

Columns 1-6 are left empty and are where the line numbers were stored on cards. This area is called the Sequence number area and is ignored by the compiler.

Next is the indicator area, a single column (7). This column is mainly used to indicate if a line is a comment, as shown above. However, it also has a few other characters such as `/`, `-`, and `D`, which have these effects: a comment that will be printed, the line continues from the previous one, or the line is enabled for debugging mode.

Area A (columns 8-11) contains the level numbers, such as 01 and 10 in our example. After 01, the exact numbers used for ordering are flexible, as long as level numbers increase for nested fields.

Columns 12-72 are called Area B and contain code not allowed in Area A. This includes the field names (continuing to around column 25 in our example) followed by the datatype definition.

73+ is the program name area. Historically, the maximum length was 80 columns due to punch card limitations. This area is used to identify the sequence of the card.

Lines must end with a full stop. This is important to remember, so be careful to include it.

### PIC

PIC tells the copybook how to interpret the data using the value defined by the following characters. For example, `XXXX` or `X(4)` represents four characters.

The basic types are:

There are two main types:
* X : Any character
* 9 : An integer
* A : A alphabetic character (A-Z with blank)

These fields then are specific modifiers for specific behaviour.

There are also some special type information:
* S : Signed field. This field will be packed.
* (n) : Symbolises multiple instances of the character that precedes it. For example 9(2) will become 99.
* V : A virtual decimal. The parser will add a decimal at this point.

Note: About decimals. Either the virtual decimal can be used which will be inserted by the parser. Or you can just use a regular decimal number. Both are supported by the specification.

That contains most of the info for most of the records, however sometimes there are additional fields such as `BINARY` above. This tells cobol how to store the data internally, usually there are just two `COMPUTATIONAL` and `DISPLAY` (default). Also included in this list are other keywords which may be useful:
 * `DISPLAY` - Stored as ASCII takes 1 BYTE.
 * `BINARY` - Stored in binary.
 * `COMP-<number>` - COMP stands for "USAGE IS COMPUTATIONAL". The number changes the space required to store a value and how it's stored within that space. Some examples are below.
   * `COMP-1` - Similar to real or float.
   * `COMP-2` - Similar to long or double.
   * `COMP-3` - Reduces storage space by using a nibble for storage.
   * `COMP-3+` - Various internal formats.
 * `VALUE` - Sets a default value.

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
00000001Niall     2A
00000002Martin    0I
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

### Acknowledgements/Further Reading

I would like to thank Oliver Hathaway for copy editing.

A thread which I heavily used to refresh my knowledge is [here][copybook].

For further reading [this university of Limerick][resource] is a great resource about Cobol.

[wikipage]: https://en.wikipedia.org/wiki/EBCDIC
[cobrix]: https://github.com/AbsaOSS/cobrix
[absa]: https://www.absa.co.za/
[simotime]: http://simotime.com/datapk01.htm
[copybook]: https://www.tek-tips.com/viewthread.cfm?qid=44991
[resource]: http://www.csis.ul.ie/cobol/
