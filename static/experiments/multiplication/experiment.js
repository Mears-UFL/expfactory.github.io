/* ************************************ */
/* Define helper functions */
/* ************************************ */
var get_response_time = function() {
  return response_time;
}

var randomDraw = function(lst) {
    var index = Math.floor(Math.random()*(lst.length))
    return lst[index]
}

var getStim = function() {
  response = 0
  var num1 = Math.floor(Math.random()*99)+1
  var num2 = Math.floor(Math.random()*99)+1
  answer = num1*num2
  var text = '<div class = centerbox><form style="font-size: 24px">' + num1 + ' * ' + num2 + ' =  <input type ="text" name ="mathtext" style="font-size: 24px"></form><br></br><button type="button" id = "SubmitButton" onclick = submit()>Submit Answer</button></div>'
  return text
}
var submit = function() {
  response = $('input:text').val()
  console.log(response)
  $("#SubmitButton").attr('disabled', true);
  var e = jQuery.Event("keydown");
    e.which = 32; // # Some key code value
    e.keyCode = 32
    $(document).trigger(e);
}

/* ************************************ */
/* Define experimental variables */
/* ************************************ */
var answer = 0
var response = 0
var response_time = 30000
var lstep = 5000
var sstep = 1000
var p = .5 // The probability of a correct response for the staircase
var fatigue_time = 45

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
/* define static blocks */
var welcome_block = {
  type: 'text',
  text: '<div class = centerbox><p class = block-text>Welcome to the multiplication experiment. Press <strong>enter</strong> to begin.</p></div>',
  cont_key: 13,
  timing_post_trial: 0
};

var instructions_block = {
  type: 'instructions',
  pages: ['<div class = centerbox><p class = block-text>In this experiment we are interested in how people multiply numbers. Every trial in this experiment will require you to multiply two 2-digit numbers (e.g. 37 * 86) together and enter the answer.</p><p class = block-text>While doing the multiplication you are free to use paper and pencil or do them in your head, but be consistent and do not use a calculator or your computer. That means if you decide to use paper and pencil, please use paper and pencil for the entire experiment.</p><p class = block-text>Finally, this experiment is long! To figure out how people multiple we need you to multiply many numbers and it is important that you stay engaged! The whole experiment will take about an hour.</p></div>'],
  allow_keys: false,
  show_clickable_nav: true,
  timing_post_trial: 1000
};

var end_block = {
  type: 'text',
  text: '<div class = centerbox><p class = center-block-text>Finished with this task.</p><p class = center-block-text>Press <strong>enter</strong> to continue.</p></div>',
  cont_key: 13,
  timing_post_trial: 0
};

//Define staircase blocks
var largeStep_block = {
    type: 'single-stim',
    stimuli: getStim,
    is_html: true,
    choices: 32, 
    timing_stim: get_response_time,
    timing_response: get_response_time,
    response_ends_trial: false,
    repetitions: 50,
    on_finish: function() {
      jsPsych.data.addDataToLastTrial({"response": response, "answer": answer, "response_time": response_time})
      // staircase
      if (response == answer) {
        response_time -= lstep*(1-p)
      } else {
        response_time += lstep*p
      }
    }
}

var smallStep_block = {
    type: 'single-stim',
    stimuli: getStim,
    is_html: true,
    choices: 32, 
    timing_stim: get_response_time,
    timing_response: get_response_time,
    response_ends_trial: false,
    repetitions: 50,
    on_finish: function() {
      jsPsych.data.addDataToLastTrial({"response": response, "answer": answer, "response_time": response_time})
      // staircase
      if (response == answer) {
        response_time -= sstep*(1-p)
      } else {
        response_time += sstep*p
      }
    }
}

//45 minutes of math
var fatigue_block = {
    type: 'single-stim',
    stimuli: getStim,
    is_html: true,
    choices: 32, 
    timing_stim: get_response_time,
    timing_response: get_response_time,
    response_ends_trial: false,
    repetitions: Math.floor(60000*fatigue_time/response_time),
    on_finish: function() {
      jsPsych.data.addDataToLastTrial({"response": response, "answer": answer, "response_time": response_time})
    }
}




/* create experiment definition array */
var multiplication_experiment = []
multiplication_experiment.push(welcome_block)
multiplication_experiment.push(instructions_block)
multiplication_experiment.push(largeStep_block)
multiplication_experiment.push(smallStep_block)
