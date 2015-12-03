/* Fetch the static Firebase URL */
function getFirebaseUrl() {
  return "https://sizzling-torch-4793.firebaseio.com/";
}

/* Returns the firebase key in the query parameters of window.location */
function getFirebaseKey() {
  return window.location.search.split("session=")[1];
}

/* Returns the Firebase url to the brainstorm session with the key */
function getSessionUrl(key) {
  return getFirebaseUrl() + "sessions/" + key;
}

/* Returns the Firebase url to the brainstorm idea entity with the key */
function getIdeasUrl(key) {
  return getSessionUrl(key) + "/ideas/";
}

function getChatUrl(key) {
  return getSessionUrl(key) + "/messages/";
}

/* Returns true if site is deployed, false if local testing */
function isDeployed() {
  return window.location.href.indexOf("www.willhennessy.com") > -1;
}

/* Returns the current stage: "begin", "ideation", "discussion", "decision" */
function getCurrentStage() {
  if (window.location.href.indexOf("begin") > -1)
    return "begin";
  else if (window.location.href.indexOf("ideation") > -1)
    return "ideation";
  else if (window.location.href.indexOf("discussion") > -1)
    return "discussion";
  else if (window.location.href.indexOf("election") > -1)
    return "election";
  else if (window.location.href.indexOf("decision") > -1)
    return "decision";
}

/* param: none (assumes key is in the query params of window.location)
   return: A storm URL to be shared with participants */
function generateStormLink() {
  var key = getFirebaseKey();
  if (isDeployed()) {
    return "<a href=\"http://www.willhennessy.com/storm/session?session="+key+"\">http://www.willhennessy.com/storm/session?session="+key;
  } else {
    return "<a href=\"/Users/willhennessy/Documents/CS%20598%20-%20Social/storm/session_begin.html?session="+key+"\">http://www.willhennessy.com/storm/session?session="+key;
  }
}

/* param: 24-hour time "13:24"
   output: 12-hour time "1:24 pm" */
function formatTime(rawTime) {
  var h = parseInt(rawTime.split(':')[0]);
  var m = rawTime.split(':')[1];
  var output = "";
  if (h > 12)
    output += h-12;
  else if (h == 0)
    output += 12;
  else
    output += h;

  output += ":";
  output += m;

  if (h >= 12)
    output += " pm";
  else
    output += " am";

  return output;
}

function generateBallotEntry(idx, title, description) {
  return "<div class='vote-container'>"
            +"<div class='vote-boxes'>"
              +"<label><input type='radio' name='one' value='"+idx+"'>1</label> "
              +"<label><input type='radio' name='two' value='"+idx+"'>2</label> "
              +"<label><input type='radio' name='three' value='"+idx+"'>3</label> "
            +"</div>"
            +"<div class='vote-information'>"
              +"<div class='vote-title'>"+title+"</div>"
              + description
            +"</div>"
          +"</div>";
}
