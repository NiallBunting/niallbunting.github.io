---
layout: post
title:  "EBCDIC Character Format - A Guide"
date:   2019-12-09 18:00:00
categories: EBCDIC Cobol packing copybooks
---

This aims to explain what EBCDIC is and give an overview how to use it. If you want to read about its history, have a look at the [wiki page][wikipage] (also take a look at the joke section). Also includes the command to do EBCDIC Cobol to ASCII conversions.

This post is mainly going to deal with fixed width EBCDIC records. We will also briefly cover reading EBCDIC into a Apache Spark cluster using the Cobrix library.

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

At its heart, both EBCDIC (Extended Binary Coded Decimal Interchange Code) and ASCII (American Standard Code for Information Interchange) are methods of character encoding. In simple terms, they are a way of translating a binary number sequence into letters and numbers: ie 61 = a, 62 = b, 63 = c.

EBCDIC uses an 8-bit (one byte) character encoding, this is different from ASCII that uses a 7-bit encoding.

EBCDIC is used to encode the Latin character set. However, there are multiple different versions of EBCDIC that are inoperable with each other, the different formats are defined by their code pages, and they are different. I recommend checking which one your project uses.

Here is an example of a fixed width record (in ASCII for readability).

{% highlight text %}
00000001Niall     2
00000002Martin    9
{% endhighlight %}

As you can see in the data, there is no schema baked into this record, so if you received this file you would not know how to parse it. 

The schemas are stored in separate files called copybooks, there are two main ways these records can be composed, either fixed or variable width records. The difference between these is how a record is formatted. A fixed width record will always have the exact same length e.g. fixed width of 512 characters, means each record would be that length even if it was just a name. 

Another thing to highlight, if you convert EBCDIC to ASCII encoding the numbers are just characters, rather than using a number format for representation by default. This causes numbers to take up lots of space as each number character is stored independently.

#### EBCDIC Packing

EBCDIC uses an 8 bit character set, meaning that every row of an EBCDIC file can be read as a string. With a strong focus on minimizing field widths, one trick that this format employs when encoding numbers is to have the sign (whether it's positive or negative) encoded as part of the string changing the least significant digit from a number to a non numeric character. This saves a character by turning the four character "-100" to the three character "10}"

Packing uses nibbles (4 bits) of a byte rather than using the full byte. To store the information about a given number. 

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

The layout of a copybook follows the file layout of Cobol. This means that columns have specific uses and this also needs to be followed in the Copybook.

Columns 1-6 are left empty and are where the line numbers were stored on cards. This area is called the Sequence number area and is ignored by the compiler.

Next we have the indicator area which is a single column (7). This column is mainly used to indicate if that line is a comment. As seen above. However it also has a few other characters such as `/`, `-`, and `D`. They have the following effects: a comment that w will be printed, the line continues from the previous one, and enables that line in debugging mode.

Area A (8-11) contains the level numbers such as 01 and 10 in our example. After 01 it does not matter the exact numbers used for ordering. However, the level numbers do need to be larger than any sections below.

Columns 12-72 are called Area B and that contains any other code not allowed in Area A. This contains the name of the field in the above example that continues to around column 25. Next is the definition of the datatype. Described in the next section.

73+ is the program name area. Historically the max was 80 due to punch cards. It is used to identify the sequence of the card.

Lines must end with a full stop, this is a gotcha, so be careful to add it.

### PIC

PIC is the next thing we come across, this just tells the copybook how to interpret the data in this case using the value defined by the following number. Where `XXXX` or `X(4)` would be four characters.

The basic types are the following:

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
