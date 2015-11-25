/* Return the firebase key in the query parameters of window.location */
function getFirebaseKey() {
  return window.location.search.split("session=")[1];
}

/* Returns true if site is deployed, false if local testing */
function isDeployed() {
  return window.location.href.indexOf("www.willhennessy.com") > -1;
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
