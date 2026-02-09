---
layout: post
title:  "Attempting to get an intuitive picture of COVID deaths"
date:   2020-06-24 12:00:00
categories: covid rate daily
---

Most of us have heard the quote "A Single Death is a Tragedy; a Million Deaths is a Statistic". Let’s see if we can change that.

I can't truly hold a million in my head, nor can I grasp the value <input type="number" id="deaths" value="43081" onKeyUp="updateValues()"/> which represents today's (2020-06-24) cumulative deaths in the UK with a population of <input type="number" id="pop" value="67879245" onKeyUp="updateValues()"/>. (Feel free to update these numbers with the [values of your country][worldometer].)

The first thing I thought about is how many deaths occurred per thousand people. For the UK this number is less than one, which is hard to visualize.

Maybe thinking about a crowd would help. The capacity of Old Trafford (the stadium of Manchester United) is 74,879, which means if we apply the death rate here, <span id="manunited"></span>% of a full stadium would have died.

Or if all those people boarded double-decker buses, it would take <span id="bus"></span> buses to transport them all. Or <span id="plane"></span> Boeing 737s to get them all airborne, which would represent <span id="planeinair"></span>% of global air traffic.

I came across [a video][paperclips] where schoolchildren gathered paperclips to represent each death in the Holocaust, and I thought I would do something similar here. Each asterisk below represents a life that has been lost to this disease.

<span id="dots"></span>

Hopefully that helps. The long scroll made it feel more tangible for me.

[worldometer]: https://www.worldometers.info/coronavirus/
[paperclips]: https://www.youtube.com/watch?v=xGnhilD9yGg

<script>

function updateValues() {
  const deaths = parseInt(document.getElementById("deaths").value, 10);
  const population = parseInt(document.getElementById("pop").value, 10);

  document.getElementById("perthousand").innerHTML =  Math.round((deaths / (population / 1000)) * 1000) / 1000;
  document.getElementById("manunited").innerHTML =  Math.round((deaths / 74879.0) * 1000) / 10;
  document.getElementById("bus").innerHTML =  Math.ceil(deaths / 78);
  document.getElementById("plane").innerHTML =  Math.ceil(deaths /  180);
  document.getElementById("planeinair").innerHTML =  Math.round((Math.ceil(deaths /  180)/8000) * 1000) / 10;

  let dots = "";
  let remaining = deaths;

  if(remaining > 78) {
    dots += "*".repeat(78);
    remaining -= 78;
    dots += "<br>Capacity of one double decker</br>";
  }

  if(remaining > 180 - 78) {
    dots += "*".repeat(180-78);
    remaining -= 180-78;
    dots += "<br>Capacity of one Boeing 737</br>";

  }


  if(remaining > 1000 - 180) {
    dots += "*".repeat(1000-180);
    remaining -= 1000-180;
    dots += "<br>One Thousand</br>";
  }

  if(remaining > 10000 - 1000) {
    dots += "*".repeat(10000-1000);
    remaining -= 10000-1000;
    dots += "<br>Ten Thousand</br>";
  }

 
  if(remaining > 77263 - 10000) {
    dots += "*".repeat(77263-10000);
    remaining -= 77163-10000;
    dots += "<br>Population of Andorra</br>";

  }

  if(remaining > 1000000 - 77263) {
    dots += "*".repeat(1000000 - 77263);
    remaining -= 1000000 - 77163;
    dots += "<br>One million people</br>";

  }

  dots += "*".repeat(remaining);

  document.getElementById("dots").innerHTML = dots;
}

updateValues();

</script>
