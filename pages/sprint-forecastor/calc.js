// STATS CODE FROM https://www.math.ucla.edu/~tom/
function LogGamma(Z) {
	with (Math) {
		var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
		var LG= (Z-.5)*log(Z+4.5)-(Z+4.5)+log(S*2.50662827465);
	}
	return LG
}

function Betinc(X,A,B) {
	var A0=0;
	var B0=1;
	var A1=1;
	var B1=1;
	var M9=0;
	var A2=0;
	var C9;
	while (Math.abs((A1-A2)/A1)>.00001) {
		A2=A1;
		C9=-(A+M9)*(A+B+M9)*X/(A+2*M9)/(A+2*M9+1);
		A0=A1+C9*A0;
		B0=B1+C9*B0;
		M9=M9+1;
		C9=M9*(B-M9)*X/(A+2*M9-1)/(A+2*M9);
		A1=A0+C9*A1;
		B1=B0+C9*B1;
		A0=A0/B1;
		B0=B0/B1;
		A1=A1/B1;
		B1=1;
	}
	return A1/A
}

function compute(X, df) {
    with (Math) {
		if (df<=0 || !df) {
			error("Please enter more than one value.")
                        return;
		} else {
			A=df/2;
			S=A+.5;
			Z=df/(df+X*X);
			BT=exp(LogGamma(S)-LogGamma(.5)-LogGamma(A)+A*log(Z)+.5*log(1-Z));
			if (Z<(A+1)/(S+2)) {
				betacdf=BT*Betinc(Z,A,.5)
			} else {
				betacdf=1-BT*Betinc(1-Z,.5,A)
			}
			if (X<0) {
				tcdf=betacdf/2
			} else {
				tcdf=1-betacdf/2
			}
		}
		tcdf=round(tcdf*100000)/100000;
	}
    return tcdf;
}

// Test - 80, 90, 95, 99
// Two tailed 
const TTESTVALUES = [
  [3.078, 6.314, 12.706, 63.657],
  [1.886, 2.920, 4.303, 9.925],
  [1.638, 2.353, 3.182, 5.841],
  [1.533, 2.132, 2.776, 4.604],
  [1.476, 2.015, 2.571, 4.032],
  [1.440, 1.943, 2.447, 3.707],
  [1.415, 1.895, 2.365, 3.499],
  [1.397, 1.860, 2.306, 3.355],
  [1.383, 1.833, 2.262, 3.250],
  [1.372, 1.812, 2.228, 3.169],
  [1.363, 1.796, 2.201, 3.106],
  [1.356, 1.782, 2.179, 3.055],
  [1.350, 1.771, 2.160, 3.012],
  [1.345, 1.761, 2.145, 2.977],
  [1.341, 1.753, 2.131, 2.947],
  [1.337, 1.746, 2.120, 2.921],
  [1.333, 1.740, 2.110, 2.898],
  [1.330, 1.734, 2.101, 2.878],
  [1.328, 1.729, 2.093, 2.861],
  [1.325, 1.725, 2.086, 2.845],
  [1.323, 1.721, 2.080, 2.831],
  [1.321, 1.717, 2.074, 2.819],
  [1.319, 1.714, 2.069, 2.807],
  [1.318, 1.711, 2.064, 2.797],
  [1.316, 1.708, 2.060, 2.787],
  [1.315, 1.706, 2.056, 2.779],
  [1.314, 1.703, 2.052, 2.771],
  [1.313, 1.701, 2.048, 2.763],
  [1.311, 1.699, 2.045, 2.756],
  [1.310, 1.697, 2.042, 2.750]
];

function error(text) {
  document.getElementById("error").innerHTML = text;
}

function doCalulations() {
  console.log("Calculating...");
  error("");

  // Get the numbers from the intput box
  const elementText = document.getElementById("values").value;
  const elementCIIndex = document.getElementById("confidence").selectedIndex;

  let samples = elementText.replace(/\s+/g, '').split(',').filter((x) => x && parseInt(x, 10) > 0).map((f) => parseInt(f, 10));

  if (samples.length < 2) {
    error("Please enter 2 or more velocity values.");
    return;
  }

  if (samples.length > 30) {
    error("Wow that's a lot of data. This page is going to be inaccurate with that. If you see this please email me velocity-at-niallbunting.com and complain. I might add the normal distribution to handle this.");
  }

  const n = samples.length;
  const mean = samples.reduce((a,b) => a+b)/n;

  let sd =  Math.sqrt(samples.map(x => Math.pow(x-mean, 2)).reduce((a, b) => a+b) / (n-1));

  const chance = [...Array(Math.floor(mean*3)).keys()].map(val => {
    return {
      "value": (1 - compute((val-mean)/sd, samples.length - 1)),
      "header": val
    };
  });


  const ciconst = TTESTVALUES[samples.length <= 30 ? samples.length-1 : 29][elementCIIndex]; 

  const ci =  ciconst * (sd / Math.sqrt(n))
  const ciupper = mean + ci;
  const cilower = mean - ci;


  document.getElementById("numbers").innerHTML = generateTable(chance);
  document.getElementById("average").innerHTML = formatNumber(mean);
  document.getElementById("confidencedisplay").innerHTML = formatNumber(cilower) + "-" + formatNumber(ciupper);
}


// please don't look close this was mocked up in an evening.
function generateTable(values) {
  let returnVal = '<div class="divTableRow">';

  returnVal += values.map(x => '<div class="divTableCell">' + x.header + '</div>').reduce((a, b) => a + b);
  returnVal += '</div> <div class="divTableRow">';
  returnVal += values.map(x => '<div class="divTableCell">' + formatNumber(x.value * 100) + '%</div>').reduce((a, b) => a + b);
  returnVal += '</div>'

  return returnVal;
}

function formatNumber(value) {
  if(value < 0) { return 0 };
  return Math.round(value * 10) / 10;
}

let timeoutHandle;

function updateDropdown() {
  doCalulations();
}

function updateText() {
  window.clearTimeout(timeoutHandle);
  timeoutHandle = window.setTimeout(doCalulations, 500);
}
