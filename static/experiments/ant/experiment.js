/* reference: Fan, J., McCandliss, B. D., Sommer, T., Raz, A., & Posner, M. I. (2002). Testing the efficiency and independence of attentional networks. 
Journal of Cognitive Neuroscience, 14(3), 340-7. doi:10.1162/089892902317361886
*/

/* ************************************ */
/* Define helper functions */
/* ************************************ */
var post_trial_gap = function() {
  var curr_trial = jsPsych.progress().current_trial_global
  return 3500 - jsPsych.data.getData()[curr_trial - 1].rt - jsPsych.data.getData()[curr_trial - 4].duration
}

var get_RT = function() {
  var curr_trial = jsPsych.progress().current_trial_global
  return jsPsych.data.getData()[curr_trial].rt
}

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
/* set up stim: location (2) * cue (4) * direction (2) * condition (3) */
var locations = ['up', 'down']
var cues = ['nocue', 'center', 'double', 'spatial']
var current_trial = 0
var test_stimuli = []
for (l = 0; l < locations.length; l++) {
	var loc = locations[l]
	for (ci = 0; ci < cues.length; ci++) {
		var c = cues[ci]
		stims = [
		  {
			image: '<div class = centerbox><p class = ANT_text>+</p></div><div class = ANT_' + loc + '><p class = ANT_text> &mdash; &mdash; &larr; &mdash; &mdash;</p></div></div>',
			data: {correct_response: 37, direction: 'left', flanker: 'neutral', location: loc, cue: c, exp_id: 'ant'}
		  }, 
		  {
			image: '<div class = centerbox><p class = ANT_text>+</p></div><div class = ANT_' + loc + '><p class = ANT_text> &larr; &larr; &larr; &larr; &larr; </p></div></div>',
			data: {correct_response: 37, direction: 'left', flanker: 'congruent', location: loc, cue: c, exp_id: 'ant'}
		  }, 
		  {
			image: '<div class = centerbox><p class = ANT_text>+</p></div><div class = ANT_' + loc + '><p class = ANT_text> &rarr; &rarr; &larr; &rarr; &rarr; </p></div></div>',
			data: {correct_response: 37, direction: 'left', flanker: 'incongruent', location: loc, cue: c, exp_id: 'ant'}
		  }, 
		  {
			image: '<div class = centerbox><p class = ANT_text>+</p></div><div class = ANT_' + loc + '><p class = ANT_text> &mdash; &mdash; &rarr; &mdash; &mdash; </p></div></div>',
			data: {correct_response: 39,direction: 'right', flanker: 'neutral', location: loc, cue: c, exp_id: 'ant'}
		  }, 
		  {
			image: '<div class = centerbox><p class = ANT_text>+</p></div><div class = ANT_' + loc + '><p class = ANT_text> &rarr; &rarr; &rarr; &rarr; &rarr; </p></div></div>',
			data: {correct_response: 39, direction: 'right', flanker: 'congruent', location: loc, cue: c, exp_id: 'ant'}
		  }, 
		  {
			image: '<div class = centerbox><p class = ANT_text>+</p></div><div class = ANT_' + loc + '><p class = ANT_text> &larr; &larr; &rarr; &larr; &larr; </p></div></div>',
			data: {correct_response: 39, direction: 'right', flanker: 'incongruent', location: loc, cue: c, exp_id: 'ant'}
		  }
	  ]
	  for (i= 0; i < stims.length; i++) {
		test_stimuli.push(stims[i])
	  }
	}
}

/* set up 24 practice trials. Included all nocue up trials, center cue up trials, double cue down trials, and 6 spatial trials (3 up, 3 down) */
var practice_block = jsPsych.randomization.repeat(test_stimuli.slice(0,12).concat(test_stimuli.slice(18,21)).concat(test_stimuli.slice(36,45)),1,true);

/* set up repeats for three test blocks */
var block1_trials = jsPsych.randomization.repeat($.extend(true,[],test_stimuli), 2, true);
var block2_trials = jsPsych.randomization.repeat($.extend(true,[],test_stimuli), 2, true);
var block3_trials = jsPsych.randomization.repeat($.extend(true,[],test_stimuli), 2, true);
var blocks = [block1_trials, block2_trials, block3_trials]


/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */

/* define static blocks */
var welcome_block = {
  type: 'text',
  text: '<div class = centerbox><p class = block-text>Welcome to the ANT experiment. Press any key to begin.</p></div>',
  timing_post_trial: 0
};

var end_block = {
  type: 'text',
  text: '<div class = centerbox><p class = center-block-text>Finished with this task.</p><p class = center-block-text>Press <strong>enter</strong> to continue.</p></div>',
  cont_key: 13,
  timing_post_trial: 0
};

var instructions_block = {
  type: 'instructions',
  pages: [
	'<div class = centerbox><p class = block-text>In this experiment you will see groups of five arrows and dashes pointing left or right (e.g &larr; &larr; &larr; &larr; &larr;, or &mdash; &mdash; &rarr; &mdash; &mdash;) presented randomly at the top or bottom of the screen.</p><p class = block-text>Your job is to indicate which way the central arrow is pointing by pressing the corresponding arrow key.</p></p></p></div>',
	'<div class = centerbox><p class = block-text>Before the arrows and dashes come up, an "*" will occasionally come up, either in the center of the screen, at the top and bottom of the screen, or where the arrows and dashes will be presented.</p><p class = block-text>It is important that you respond as quickly and accurately as possible by pressing the arrow key corresponding to the center arrow.</p></div>'	
	],
	allow_keys: false,
	show_clickable_nav: true,
  timing_post_trial: 1000
};

var rest_block = {
  type: 'text',
  text: '<div class = centerbox><p class = block-text>Take a break! Press any key to continue.</p></div>',
  timing_post_trial: 1000
};

var fixation = {
  type: 'single-stim',
  stimuli: '<div class = centerbox><p class = ANT_text>+</p></div>',
  is_html: true,
  choices: 'none',
  data: {exp_id: 'ant', trial_type: 'fixation', duration: 400},
  timing_post_trial: 0,
  timing_stim: 400,
  timing_response: 400
}

var no_cue = {
  type: 'single-stim',
  stimuli: '<div class = centerbox><p class = ANT_text>+</p></div>',
  is_html: true,
  choices: 'none',
  data: {exp_id: 'ant', trial_type: 'nocue', duration: 100},
  timing_post_trial: 0,
  timing_stim: 100,
  timing_response: 100
}

var center_cue = {
  type: 'single-stim',
  stimuli: '<div class = centerbox><p class = ANT_centercue_text>*</p></div>',
  is_html: true,
  choices: 'none',
  data: {exp_id: 'ant', trial_type: 'centercue', duration: 100},
  timing_post_trial: 0,
  timing_stim: 100,
  timing_response: 100
}

var double_cue = {
  type: 'single-stim',
  stimuli: '<div class = centerbox><p class = ANT_text>+</p></div><div class = ANT_down><p class = ANT_text>*</p></div><div class = ANT_up><p class = ANT_text>*</p></div></div>',
  is_html: true,
  choices: 'none',
  data: {exp_id: 'ant', trial_type: 'doublecue', duration: 100},
  timing_post_trial: 0,
  timing_stim: 100,
  timing_response: 100
}


/* set up ANT experiment */
var ant_experiment = [];
ant_experiment.push(welcome_block);
ant_experiment.push(instructions_block);

/* set up ANT practice */
var trial_num = 0
var block = practice_block
for (i = 0; i < block.data.length; i++) {
	var trial_num = trial_num + 1
	var first_fixation_gap = Math.floor( Math.random() * 1200 ) + 400;
	var first_fixation = {
	  type: 'single-stim',
	  stimuli: '<div class = centerbox><p class = ANT_text>+</p></div>',
	  is_html: true,
	  choices: 'none',
	  data: {exp_id: 'ant', trial_type: 'fixation', duration: 100},
	  timing_post_trial: 0,
	  timing_stim: first_fixation_gap,
	  timing_response: first_fixation_gap
	}
	ant_experiment.push(first_fixation)
		
	if (block.data[i].cue == 'nocue') {
		ant_experiment.push(no_cue)
	} else if (block.data[i].cue == 'center') {
		ant_experiment.push(center_cue)
	} else if (block.data[i].cue == 'double') {
		ant_experiment.push(double_cue)
	} else {
		var spatial_cue = {
		  type: 'single-stim',
		  stimuli: '<div class = centerbox><div class = ANT_' + block.data[i].location +'><p class = ANT_text>*</p></div></div>',
		  is_html: true,
		  choices: 'none',
		  data: {exp_id: 'ant', trial_type: 'spatialcue', duration: 100},
		  timing_post_trial: 0,
		  timing_stim: 100,
		  timing_response: 100
		}
		ant_experiment.push(spatial_cue)
	}
	ant_experiment.push(fixation)
	
	block.data[i]['trial_num'] = trial_num
	block.data[i]['exp_id'] = 'ant_practice'
	var ant_practice_trial = {
	  type: 'ant_practice',
	  stimuli: block.image[i],
	  is_html: true,
	  key_answer: block.data[i].correct_response,
	  correct_text: '<div class = centerbox><div class = center-text>Correct. <br></br>Reaction time: RT ms.</div></div>',
	  incorrect_text: '<div class = centerbox><div class = center-text>Incorrect. <br></br>Reaction time: RT ms.</div></div>',
	  timeout_message: '<div class = centerbox><div class = center-text>Respond faster!</div></div>',
	  choices: [37,39],
	  data: block.data[i],
	  timing_response: 1700, 
	  timing_stim: 1700,
	  timing_feedback_duration: 1000,
	  show_stim_with_feedback: false,
	  timing_post_trial: 0
	}
	ant_experiment.push(ant_practice_trial)

	var last_fixation = {
	  type: 'single-stim',
	  stimuli: '<div class = centerbox><p class = ANT_text>+</p></div>',
	  is_html: true,
	  choices: 'none',
	  data: {exp_id: 'ant', trial_type: 'fixation', duration: 100},
	  timing_post_trial: 0,
	  timing_stim: post_trial_gap,
	  timing_response: post_trial_gap
	}
	ant_experiment.push(last_fixation)
}
ant_experiment.push(rest_block)


/* Set up ANT main task */
var trial_num = 0
for (b = 0; b < blocks.length; b ++) {
	var block = blocks[b]
	for (i = 0; i < block.data.length; i++) {
		var trial_num = trial_num + 1
		var first_fixation_gap = Math.floor( Math.random() * 1200 ) + 400;
		var first_fixation = {
		  type: 'single-stim',
		  stimuli: '<div class = centerbox><p class = ANT_text>+</p></div>',
		  is_html: true,
		  choices: 'none',
		  data: {exp_id: 'fixation', duration: first_fixation_gap},
		  timing_post_trial: 0,
		  timing_stim: first_fixation_gap,
		  timing_response: first_fixation_gap
		}
		ant_experiment.push(first_fixation)
			
		if (block.data[i].cue == 'nocue') {
			ant_experiment.push(no_cue)
		} else if (block.data[i].cue == 'center') {
			ant_experiment.push(center_cue)
		} else if (block.data[i].cue == 'double') {
			ant_experiment.push(double_cue)
		} else {
			var spatial_cue = {
			  type: 'single-stim',
			  stimuli: '<div class = centerbox><div class = ANT_' + block.data[i].location +'><p class = ANT_text>*</p></div></div>',
			  is_html: true,
			  choices: 'none',
			  data: {exp_id: 'spatialcue', duration: 100},
			  timing_post_trial: 0,
			  timing_stim: 100,
			  timing_response: 100
			}
			ant_experiment.push(spatial_cue)
		}
		ant_experiment.push(fixation)
		
		block.data[i]['trial_num'] = trial_num
		var ANT_trial = {
		  type: 'single-stim',
		  stimuli: block.image[i],
		  is_html: true,
		  choices: [37,39],
		  data: block.data[i],
		  timing_response: 1700, 
		  timing_stim: 1700,
		  timing_post_trial: 0
		}
		ant_experiment.push(ANT_trial)
	
		var last_fixation = {
		  type: 'single-stim',
		  stimuli: '<div class = centerbox><p class = ANT_text>+</p></div>',
		  is_html: true,
		  choices: 'none',
		  data: {exp_id: 'fixation'},
		  timing_post_trial: 0,
		  timing_stim: post_trial_gap,
		  timing_response: post_trial_gap
		}
		ant_experiment.push(last_fixation)
	}
	ant_experiment.push(rest_block)
}

ant_experiment.push(end_block)
