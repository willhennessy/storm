var min = 1;
var sec = 11;

function isWithinOneHour(now, start) {
  var diff = start.getTime() - now.getTime();
  return diff >= 0 && diff < 3600000; // 1hr in ms
}

/* Init for stage 1 (definition) */
function initDefinitionClock(startDate, startTime, duration) {
  var now = new Date();
  var start = new Date(startDate+","+startTime);
  console.log(start);
  var diff = start.getTime() - now.getTime();
  if (diff < 0) { // session already started
  	finishStage();
  } else if (diff < 3600000) { // starting soon. display countdown
    min = Math.floor(diff/1000/60);
    sec = Math.floor((diff/1000) % 60)
  	$("#clock").html(getTimeString());
  	updateClock(); // run once to start
	setInterval(updateClock,1000);
  }
}

function finishStage() {
  // redirect to the next page
  var key = getFirebaseKey();
  if (isDeployed()) {
    window.location.replace("http://www.willhennessy.com/storm/ideation?session="+key);
  } else {
    window.location.replace("/Users/willhennessy/Documents/CS%20598%20-%20Social/storm/ideation.html?&session="+key);
  }
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
