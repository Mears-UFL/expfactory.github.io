/* ************************************ */
/* Define helper functions */
/* ************************************ */

// Function to generate random numbers from normal distribution
// Adapted from https://github.com/robbrit/randgen/blob/master/lib/randgen.js
function rnorm(mean, stdev) {
  var u1, u2, v1, v2, s;
  if (mean === undefined) {
    mean = 0.0;
  }
  if (stdev === undefined) {
    stdev = 1.0;
  }
  if (rnorm.v2 === null) {
    do {
      u1 = Math.random();
      u2 = Math.random();

      v1 = 2 * u1 - 1;
      v2 = 2 * u2 - 1;
      s = v1 * v1 + v2 * v2;
    } while (s === 0 || s >= 1);

    rnorm.v2 = v2 * Math.sqrt(-2 * Math.log(s) / s);
    return stdev * v1 * Math.sqrt(-2 * Math.log(s) / s) + mean;
  }

  v2 = rnorm.v2;
  rnorm.v2 = null;
  return stdev * v2 + mean;
}

rnorm.v2 = null;

//Funciton to repeat items in an array desired number of times
function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    for(var j=0; j<value.length; j++){
      arr.push(value[j]);
    }
  }
  return arr;
}

/* ************************************ */
/* Define experimental variables */
/* ************************************ */

//First generate smaller amounts (mean = 20, sd = 10, clipped at 5 and 40)
var small_amts = [];
for (i=0; i<36; i++) {
      small_amts[i] = Math.round(rnorm(20, 10)*100)/100

      if(small_amts[i]<5){
        small_amts[i] = 5;
      };
      if(small_amts[i]>40){
        small_amts[i] =40;
      }
    };

//Based on smaller amounts generate larger amounts (1, 5, 10, 15, 20, 25, 30, 50, 75% higher)
var rel_dif = fillArray([1.01, 1.05, 1.10, 1.15, 1.20, 1.25, 1.30, 1.50, 1.75], 4)

var large_amts = [];
for (i=0; i<36; i++){
    large_amts[i] = Math.round(small_amts[i]*rel_dif[i]*100)/100;
  };

//Generate sooner delays (today or in 2 weeks - 18 each)
var sooner_dels = fillArray(["today"], 18).concat(fillArray(["2 weeks"], 18));

//Finally determine later delays (interval 2 or 4 weeks so half of the now trials: 2 weeks, half of now: 4 weeks, half of not now: 4 weeks, half of not now: 6 weeks)
var later_dels = fillArray(["2 weeks"], 9).concat(fillArray(["4 weeks"], 18)).concat(fillArray(["6 weeks"], 9));

//Put all options in same object
var options = {
	small_amt: small_amts,
  sooner_del: sooner_dels,
	large_amt: large_amts,
	later_del: later_dels
}

var trials = [];

//loop through each option to create html
for(var i = 0; i < options.small_amt.length; i++){
	trials[i] = "<div class = centerbox id='container'><p class = center-block-text>Please select the option that you would prefer pressing <strong>'q'</strong> for left <strong>'p'</strong> for right:</p><div class='table'><div class='row'><div id = 'option'><center><font color='green'>$" + options.small_amt[i] + "<br>"+options.sooner_del[i]+"</font></center></div><div id = 'option'><center><font color='green'>$" + options.large_amt[i] + "<br>" + options.later_del[i] + "</font></center></div></div></div></div>"
}

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */

/* define static blocks */

var welcome_block = {
	
  type: 'text',
  text: '<div class = centerbox><p class = block-text>Welcome to the experiment. Press <strong>enter</strong> to begin.</p></div>',
  cont_key: 13,
  timing_post_trial: 0
};

var instructions_block = {
  type: 'instructions',
  pages: [
    '<div class = centerbox><p class = block-text>In this experiment you will be presented with two amounts of money to choose between. These amounts will be available at different time points. Your job is to indicate which option you would prefer by pressing <strong>"q"</strong> for the left option and <strong>"p"</strong> for the right option.</p><p class = block-text>You should indicate your <strong>true</strong> preference because at the end of the experiment a random trial will be chosen and you will receive a bonus payment proportional to the option you selected at the time point you chose.</p></div>',
  ],
  allow_keys: false,
  show_clickable_nav: true,
  timing_post_trial: 1000
};

var start_practice_block = {
  type: 'text',
  text: '<div class = centerbox><p class = center-block-text>Here is a sample trial. Your choice for this trial will not be included in your bonus payment.</p><p class = center-block-text>Press <strong>enter</strong> to begin.</p></div>',
  cont_key: 13,
  timing_post_trial: 1000
};

var practice_block = {
	type: 'single-stim',
	stimuli: ["<div class = centerbox id='container'><p class = center-block-text>Please select the option that you would prefer pressing <strong>'q'</strong> for left <strong>'p'</strong> for right:</p><div class='table'><div class='row'><div id = 'option'><center><font color='green'>$20.58<br>today</font></center></div><div id = 'option'><center><font color='green'>$25.93<br>2 weeks</font></center></div></div></div></div>"],
	is_html: true,
	choices: ['q', 'p']
};

var start_test_block = {
  type: 'text',
  text: '<div class = centerbox><p class = center-block-text>You are now ready to begin the survey.</p><p class = center-block-text>Remember to indicate your <strong>true</strong> preferences.</p><p class = center-block-text>Press <strong>enter</strong> to begin.</p></div>',
  cont_key: 13,
  timing_post_trial: 1000
};

var test_block = {
	type: 'single-stim',
	stimuli: trials,
	is_html: true,
	choices: ['q', 'p'],
  randomize_order: true
};

var end_block = {
  type: 'text',
  text: '<div class = centerbox><p class = center-block-text>Congratulations for completing this task!</p><p class = center-block-text>Press <strong>enter</strong> to continue.</p></div>',
  cont_key: 13,
  timing_post_trial: 0
};


//Set up experiment
var discount_titrate_experiment = []
discount_titrate_experiment.push(welcome_block);
discount_titrate_experiment.push(instructions_block);
discount_titrate_experiment.push(start_practice_block);
discount_titrate_experiment.push(practice_block);
discount_titrate_experiment.push(start_test_block);
discount_titrate_experiment.push(test_block);
discount_titrate_experiment.push(end_block)
