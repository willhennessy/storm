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