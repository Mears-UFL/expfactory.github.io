/* ************************************ */
/* Define helper functions */
/* ************************************ */
var post_trial_gap = function() {
  gap = Math.floor( Math.random() * 500 ) + 500
  return gap;
}

/* Append gap and current trial to data and then recalculate for next trial*/
var appendData = function() {
	jsPsych.data.addDataToLastTrial({trial_num: current_trial})
	current_trial = current_trial + 1
}

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
var gap = 0
var current_trial = 0
//set stim/response mapping
var correct_responses = jsPsych.randomization.shuffle([['"M"',77],['"Z"',90]])
//set up block stim. correct_responses indexed by [block][stim][type]

var practice_stimuli = [
  {
	stimulus: '<div class = centerbox><div  id = "stim1"></div></div>',
	data: { stim_id: 1, correct_response: correct_responses[0][1], trial_id: 'practice', exp_id: 'choice_reaction_time'},
	key_answer: correct_responses[0][1]
  },
  {
	stimulus:  '<div class = centerbox><div id = "stim2"></div></div>',
	data: { stim_id: 2, correct_response: correct_responses[1][1], trial_id: 'practice', exp_id: 'choice_reaction_time'},
	key_answer: correct_responses[1][1]
  }
];
var test_stimuli_block = [
  {
	stimulus: '<div class = centerbox><div  id = "stim1"></div></div>',
	data: { stim_id: 1, correct_response: correct_responses[0][1], trial_id: 'test_block', exp_id: 'choice_reaction_time'}
  },
  {
	stimulus:  '<div class = centerbox><div id = "stim2"></div></div>',
	data: { stim_id: 2, correct_response: correct_responses[1][1], trial_id: 'test_block', exp_id: 'choice_reaction_time'}
  }
];


var practice_trials = jsPsych.randomization.repeat(practice_stimuli, 5);
var test_trials = jsPsych.randomization.repeat(test_stimuli_block, 25);


/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
/* define static blocks */
var welcome_block = {
  type: 'text',
  text: '<div class = centerbox><p class = block-text>Welcome to the choice reaction time experiment. Press <strong>enter</strong> to begin.</p></div>',
  cont_key: [13],
  timing_post_trial: 0
};

var instructions_block = {
  type: 'poldrack-instructions',
  pages: ['<div class = centerbox><p class = block-text>In this experiment blue and orange squares will appear on the screen. You will be told to respond to one of the colored squares by pressing the "M" key and to the other by pressing the "Z" key. </p></div>'],
  allow_keys: false,
  show_clickable_nav: true,
  timing_post_trial: 1000
};

var end_block = {
  type: 'text',
  text: '<div class = centerbox><p class = center-block-text>Thanks for completing this task!</p><p class = center-block-text>Press <strong>enter</strong> to continue.</p></div>',
  cont_key: [13],
  timing_post_trial: 0
};

var reset_block = {
	type: 'call-function',
	func: function() {
		current_trial = 0
	},
	timing_post_trial: 0
}

var start_practice_block = {
  type: 'text',
  text: '<div class = centerbox><p class = block-text>We will begin with practice. If you see the <font color="orange">orange</font> square you should press the <strong>' + correct_responses[0][0] + '</strong> key. If you see the <font color="blue">blue</font> square you should press the <strong>' + correct_responses[1][0] + '</strong> key.</p><p class = block-text>You will get feedback telling you if you were correct. Press <strong>enter</strong> to begin.</p></div>',
  cont_key: [13],
  timing_post_trial: 1000
};

var start_test_block = {
  type: 'text',
  text: '<div class = centerbox><p class = block-text>We will now begin the first test block. You will no longer get feedback about your responses.</p><p class = block-text>If you see the <font color="orange">orange</font> square you should press the <strong>' + correct_responses[0][0] + '</strong> key. If you see the <font color="blue">blue</font> square you should press the <strong>' + correct_responses[1][0] + '</strong> key. Press <strong>enter</strong> to begin.</p></div>',
  cont_key: [13],
  timing_post_trial: 1000
};


/* define practice block */
var practice_block = {
  type: 'poldrack-categorize',
  timeline: practice_trials,
  is_html: true,
  correct_text: '<div class = centerbox><div class = center-text><font size = 20>Correct</font></div></div>',
  incorrect_text: '<div class = centerbox><div class = center-text><font size = 20>Incorrect</font></div></div>',
  timeout_message: '<div class = centerbox><div class = center-text><font size = 20>Too Slow</font></div></div>',
  choices: [correct_responses[0][1], correct_responses[1][1]],
  timing_response: 2000, 
  timing_stim: 2000,
  timing_feedback_duration: 1000,
  show_stim_with_feedback: false,
  timing_post_trial: post_trial_gap,
  on_finish: appendData
}

/* define test block */
var test_block = {
  type: 'poldrack-single-stim',
  timeline: test_trials,
  is_html: true,
  choices: [correct_responses[0][1], correct_responses[1][1]],
  timing_response: 2000,
  timing_post_trial: post_trial_gap,
  on_finish: appendData
};


/* create experiment definition array */
var choice_reaction_time_experiment = [];
choice_reaction_time_experiment.push(welcome_block);
choice_reaction_time_experiment.push(instructions_block);
choice_reaction_time_experiment.push(start_practice_block)
choice_reaction_time_experiment.push(practice_block);
choice_reaction_time_experiment.push(reset_block)
choice_reaction_time_experiment.push(start_test_block);
choice_reaction_time_experiment.push(test_block);
choice_reaction_time_experiment.push(end_block)
