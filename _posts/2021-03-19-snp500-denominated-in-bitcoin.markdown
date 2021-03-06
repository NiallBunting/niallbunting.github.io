---
layout: post
title:  "S&P 500 denominated in Bitcoin"
date:   2021-03-19 02:00:00
categories: finance chart snp500 denominated priced bitcoin
---

<div class="text-content">
This chart shows the price of the S&P 500 priced in Bitcoin. The historical pricing data goes back to 2011. This chart is updated on weekdays with the daily data.

This chart is generated by taking the daily USD S&P 500 closing price and dividing by the Bitcoin closing price.

## Chart
</div>

<!-- This post is a bit a with the HTML/styles/Js in here. Just want to keep it contained -->

<style>
.post {
  margin: 2rem auto;
  width: 80%;
  max-width: 1500px;
}

.post-header {
  text-align: center;
}

.text-content {
  width: 80%;
  max-width: 710px;
  margin: 4rem auto;
}

.btn {
  background: #0099ff;
  padding: 3px;
  color: #fff;
  border-radius: 5px;
}

</style>


<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.bundle.min.js"></script>
<script src="/assets/js/btcsnpdata.js"></script>

<div class="post-header">
<span class='btn' onclick="updateChart('ALL')">All</span>
<span class='btn' onclick="updateChart('10Y')">10&nbsp;Years</span>
<span class='btn' onclick="updateChart('5Y')">5&nbsp;Years</span>
<span class='btn' onclick="updateChart('2Y')">2&nbsp;Years</span>
<span class='btn' onclick="updateChart('1Y')">One&nbsp;Year</span>
<span class='btn' onclick="updateChart('YTD')">YTD</span>
<span class='btn' onclick="updateChart('6M')">6&nbsp;Months</span>
<span class='btn' onclick="updateChart('2M')">2&nbsp;Months</span>
<span class='btn' onclick="updateChart('1M')">1&nbsp;Month</span>
<span class='btn' onclick="updateChart('2W')">2&nbsp;Weeks</span>
<span class='btn' onclick="updateChart('1W')">1&nbsp;Week</span>
</div>

<canvas id="snp-bitcoin-chart" width="800" height="400"></canvas>
<script>

function updateChart(timePeriod) {
  let data = getData();
  let dates = getDates();

  switch(timePeriod) {
    case "YTD":
      var newYear = new Date(new Date().getFullYear(), 0, 1);
      var count = dates.findIndex((d) => {
        let current = new Date(d);
        return current <= newYear
      })

      data = data.slice(0, count);
      dates = dates.slice(0, count);
      break;
    case "5Y":
      data = data.slice(0, 1825);
      dates = dates.slice(0, 1825);
      break;
    case "10Y":
      data = data.slice(0, 3650);
      dates = dates.slice(0, 3650);
      break;
    case "2Y":
      data = data.slice(0, 730);
      dates = dates.slice(0, 730);
      break;
    case "1Y":
      data = data.slice(0, 365);
      dates = dates.slice(0, 365);
      break;
    case "6M":
      data = data.slice(0, 183);
      dates = dates.slice(0, 183);
      break;
    case "2M":
      data = data.slice(0, 60);
      dates = dates.slice(0, 60);
      break;
    case "1M":
      data = data.slice(0, 30);
      dates = dates.slice(0, 30);
      break;
    case "2W":
      data = data.slice(0, 14);
      dates = dates.slice(0, 14);
      break;
    case "1W":
      data = data.slice(0, 7);
      dates = dates.slice(0, 7);
      break;
    case "ALL":
    default:
      break;
  }

  snpBitcoinChart.data.datasets[0].data = data;
  snpBitcoinChart.data.labels = dates;
  snpBitcoinChart.update();
}


function getDates() {
  return dates;
}

function getData() {
  return price;
}

var ctx = document.getElementById('snp-bitcoin-chart').getContext('2d');

var snpBitcoinChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: getDates(),
        datasets: [{
            label: 'S&P 500 priced in Bitcoin',
            data: getData(),
            fill: false,
            borderColor: "rgb(0,153,255)",
            type: 'line',
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2,
        }]
    },
    options: {
      spanGaps: true,
      animation: {
        duration: 0
      },
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'series',
          offset: true,
          ticks: {
            major: {
              enabled: true,
              fontStyle: 'bold'
             },
             source: 'data',
             autoSkip: true,
             autoSkipPadding: 75,
             maxRotation: 0,
             sampleSize: 100
            }
          }
        ],
        yAxes: [{
          gridLines: {
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Closing price (BTC)'
          }
        }],
      },
      tooltips: {
          intersect: false,
          mode: 'nearest'
      }
    }
});
updateChart('2Y');
</script>

<div class="text-content">
## Analysis

(As of publishing 2021-03-19)

At first glance the overall trend seems to be downwards. This would indicate that BTC (Bitcoin) is growing in value compared to the price of the S&P, and that it would be advantageous to purchase BTC over the S&P.

However, this trend skewed by the price since September 2020. If we view the data before September, we can see from March 2018 to September 2020 the ratio remained relatively stable. This shows a period where BTC held it's value against the S&P 500. Remaining roughly worth 3 times the value. During this period the USD price of the S&P 500 increased by 70%.

#### Notable Events

On the 2nd June 2017 BTC first closed passed the S&P 500 in price. With the S&P 500 closing at $2439.07 and BTC closing at $2481.16.

The following December the first notable BTC rise occurred with prices spiking to around $17,000. Following the spike, as the dollar price of BTC started to fall the S&P denominated in BTC rose from 0.14 to around 0.4 over the following year.

From March 2020 to March 2021 the price of BTC increased from $6,000 to around $60,000. Which represented a x10 increase in dollar price whilst representing a x6 in the S&P valued in Bitcoin.

## Opinions

(As of publishing 2021-03-19)

Let me start off by saying I’m no expert, just a technology guy that has an vague idea what "Blockchain" means.

I first saw Bitcoin early on when the price was around $0.10, as a young person interested in technology, I thought Bitcoin sounded fantastic. Like many people I then promptly forgot all about it for a number of years.

When I rediscovered it around 2015 it seemed over valued to me at that time. Me and my friends had many debates about the price and most of us thought it was only a matter of time until it crashed. I have been relatively bearish ever since, assuming that it has no real value.

This graph however has changed my opinion (remember historical returns don’t guarantee future results), as it’s shown that since March 2018 BTC has not significantly changed in value when compared to the S&P 500. Whilst over this period of time the value of the S&P has increased 70%.

I think that the rapid increase in September may be the start of a bubble as normally following a rapid increase there is a rapid fall in prices. As it represents a quadrupling of it's price compared to the index over a period of 6 months. In the same period Gold has fallen from $1950 to $1750.

#### Gold

My belief that the long term trend is stable is due the fact that Bitcoin now represents a digital version of gold. Gold is mainly prized because everybody else prizes gold, outside of the uses in manufacturing. Bitcoin is also rare but is also much easier to store than 1000's of tonnes of gold.

Continuing with the comparison with gold. In the same way that the price of gold is much higher that silver, even though they both have similar properties, even though supply of gold is much higher. I believe that the same effect is happening in the cryptocurrency markets. Bitcoin will remain the most prized cryptocurrency with other not being in such high demand.

#### Closing Thoughts

If Bitcoin is going to take golds place as a store of value over time. I think it makes sense to at least take a punt on the Bitcoin wild ride before supply totally dries up when that 21st million coin is mined.


</div>

[btchistory]: https://coinmarketcap.com/currencies/bitcoin/
