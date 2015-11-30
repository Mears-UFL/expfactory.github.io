/* ************************************ */
/* Define helper functions */
/* ************************************ */

/* ************************************ */
/* Define experimental variables */
/* ************************************ */

//hard coded options in the amounts and order specified in Kirby and Marakovic (1996)
var options = {
	small_amt: [54, 55, 19, 31, 14, 47, 15, 25, 78, 40, 11, 67, 34, 27, 69, 49, 80, 24, 33, 28, 34, 25, 41, 54, 54, 22, 20],
	large_amt: [55, 75, 25, 85, 25, 50, 35, 60, 80, 55, 30, 75, 35, 50, 85, 60, 85, 35, 80, 30, 50, 30, 75, 60, 80, 25, 55],
	later_del: [117, 61, 53, 7, 19, 160, 13, 14, 192, 62, 7, 119, 186, 21, 91, 89, 157, 29, 14, 179, 30, 80, 20, 111, 30, 136, 7]
}

var trials = []

//loop through each option to create html
for(var i = 0; i < options.small_amt.length; i++){
	trials[i] = "<div class = centerbox id='container'><p class = center-block-text>Please select the option that you would prefer pressing <strong>'q'</strong> for left <strong>'p'</strong> for right:</p><div class='table'><div class='row'><div id = 'option'><center><font color='green'>$" + options.small_amt[i] + "<br>today</font></center></div><div id = 'option'><center><font color='green'>$" + options.large_amt[i] + "<br>" + options.later_del[i] + " days</font></center></div></div></div></div>"
}

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */

/* define static blocks */

var welcome_block = {
	
  type: 'text',
  text: '<div class = centerbox><p class = block-text>Welcome to the Kirby delay discounting experiment. Press <strong>enter</strong> to begin.</p></div>',
  cont_key: 13,
  timing_post_trial: 0
};

var instructions_block = {
  type: 'instructions',
  pages: [
    '<div class = centerbox><p class = block-text>In this experiment you will be presented with two amounts of money to choose between. One of the amounts will be available now and the other will be available in the future. Your job is to indicate which option you would prefer by pressing <strong>"q"</strong> for the left option and <strong>"p"</strong> for the right option.</p><p class = block-text>You should indicate your <strong>true</strong> preference because at the end of the experiment a random trial will be chosen and you will receive a bonus payment proportional to the option you selected at the time point you chose.</p></div>',
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
	stimuli: ["<div class = centerbox id='container'><p class = center-block-text>Please select the option that you would prefer pressing <strong>'q'</strong> for left <strong>'p'</strong> for right:</p><div class='table'><div class='row'><div id = 'option'><center><font color='green'>$20<br>today</font></center></div><div id = 'option'><center><font color='green'>$25<br>5 days</font></center></div></div></div></div>"],
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
	choices: ['q', 'p']
};

var end_block = {
  type: 'text',
  text: '<div class = centerbox><p class = center-block-text>Congratulations for completing this task!</p><p class = center-block-text>Press <strong>enter</strong> to continue.</p></div>',
  cont_key: 13,
  timing_post_trial: 0
};


//Set up experiment
var kirby_experiment = []
kirby_experiment.push(welcome_block);
kirby_experiment.push(instructions_block);
kirby_experiment.push(start_practice_block);
kirby_experiment.push(practice_block);
kirby_experiment.push(start_test_block);
kirby_experiment.push(test_block);
kirby_experiment.push(end_block)
