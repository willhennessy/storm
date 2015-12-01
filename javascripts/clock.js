var min = 1;
var sec = 11;
var ideas = null; // array of ideas from db
var numIdeasCompleted = 0;

function isWithinOneHour(now, start) {
  var diff = start.getTime() - now.getTime();
  return diff >= 0 && diff < 3600000; // 1hr in ms
}

/* Init for stage 1 (definition) */
function initBeginClock(startDate, startTime, duration) {
  var now = new Date();
  var start = new Date(startDate+","+startTime);
  var diff = start.getTime() - now.getTime();

  if (diff < 0) { // session already started
  	finishStage();
  } else if (diff < 6000000) {
    min = Math.floor(diff/1000/60);
    sec = Math.floor((diff/1000) % 60)
    startClock();
  } else {
  	min = 99;
  	sec = 99;
    $("#clock").html(getTimeString());
  }
}

/* init for stage 2 (ideation) */
function initIdeationClock(startDate, startTime, duration) {
  min = 0;
  sec = 20;
  startClock();
}

function initDiscussionClock(startDate, startTime, duration) {
  min = 0;
  sec = 5;

  $("#clock").html(getTimeString());
  updateDiscussionClock(); // run once to start
  intervalID = setInterval(updateDiscussionClock,1000);
}

function updateDiscussionClock() {
  if (min == 0 && sec == 0 && ideas === null) {
  	fetchIdeas();
  } else if (min == 0 && sec == 0 && !isDiscussionDone()) { 
    displayNextIdea();
    min = 0;
    sec = 10;
    $("#clock").html(getTimeString());
  } else if (min == 0 && sec == 0 && isDiscussionDone()) {
  	finishStage();
  } else {
	sec -= 1;
	if (sec < 0) {
	  min -= 1;
	  sec = 59;
	}
	$("#clock").html(getTimeString());
  }
}

/* Loads the ideas from the db and assigns them to 'ideas' var */
function fetchIdeas() {
  var key = getFirebaseKey();
  var ref = new Firebase(getSessionUrl(key));
  ref.once("value", function(snapshot) {
    var session = snapshot.val();
    ideas = session.ideas;
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

/* Replace the title and description with the next one */
function displayNextIdea() {
  var currIdea = ideas[numIdeasCompleted];
  $("#title").html(currIdea.title);
  $("#description").html(currIdea.description);
  numIdeasCompleted += 1;
}

/* Returns true if every topic has been discussed */
function isDiscussionDone() {
  return numIdeasCompleted > ideas.length;
}

/* route the appropriate finish function */
function finishStage() {
  clearInterval(intervalID);
  var stage = getCurrentStage();
  if (stage === "begin")
  	finishBegin();
  else if (stage === "ideation")
  	finishIdeation();
  else if (stage === "discussion")
  	finishDiscussion();
  else if (stage === "decision")
  	finishDecision();
  else
  	alert("Sorry, an error occured");
}

function finishBegin() {
  var key = getFirebaseKey();
  if (isDeployed())
    window.location.replace("http://www.willhennessy.com/storm/ideation?session="+key);
  else
  	window.location.replace("/Users/willhennessy/Documents/CS%20598%20-%20Social/storm/ideation.html?&session="+key);
}

function finishIdeation() {
  submitToFirebase();

  return;

  var key = getFirebaseKey();
  if (isDeployed())
    window.location.replace("http://www.willhennessy.com/storm/discussion?session="+key);
  else
  	window.location.replace("/Users/willhennessy/Documents/CS%20598%20-%20Social/storm/discussion.html?&session="+key);
}

function finishDiscussion() {
  return;
}

function finishDecision() {
  return;
}

function startClock() {
  $("#clock").html(getTimeString());
  updateClock(); // run once to start
  intervalID = setInterval(updateClock,1000);
}

function updateClock() {
  if (min == 0 && sec == 0) {
  	finishStage();
  	return;
  }

  sec -= 1;
  if (sec < 0) {
  	min -= 1;
  	sec = 59;
  }

  $("#clock").html(getTimeString());
}

function getTimeString() {
  if (min < 10)
    var m = "0" + min;
  else
  	var m = min.toString();
  if (sec < 10)
  	var s = "0" + sec;
  else
  	var s = sec.toString();

  return m + ":" + s;
}
