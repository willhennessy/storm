/* Creates a txt file transcript of the brainstorm session and
* returns a URL to download the file. */
function generateTranscript(session, winningIdea) {
  return "Brainstorm Transcript\n\n"
    	+"Date: "+session.date+"\n\n"
  		+"Time: "+formatTime(session.time)+"\n\n"
  		+"Duration: "+session.duration+" minutes\n\n"
  		+"Goal: "+session.goal+"\n\n"
  		+"Criteria:\n"
  		+" - "+session.criteria1
  		+"\n - "+session.criteria2
  		+"\n - "+session.criteria3+"\n\n"
  		+"Winning Idea: "+winningIdea.title+"\n"
  		+winningIdea.description+"\n\n"
  		+"==== Proposed Ideas ====\n"
  		+"(A 1st choice counts as 3 votes, 2nd choice counts as 2 votes, 3rd choice counts as 1 vote.)\n\n"
  		+generateIdeasTranscript(session.ideas)
  		+"==== Chat Log ====\n"
  		+generateChatTranscript(session.messages)
  		;
}

function generateIdeasTranscript(ideas) {
  var transcript = "";
  for (i = 0; i < ideas.length; i++) {
  	transcript +=
  	  ideas[i].title+"\n"
  	  +ideas[i].description+"\n"
  	  +"Votes: "+ideas[i].votes+"\n\n";
  }
  return transcript;
}

function generateChatTranscript(messages) {
  var messagesRef = new Firebase(getSessionUrl()+"/messages/");
  messagesRef.once("value", function(snapshot) {
  	snapshot.forEach(function(childSnapshot) {
  		console.log(childSnapshot.val());
  	});
  });

  var transcript = "";
  console.log(messages);

  for (i = 0; i < messages.length; i++) {
    transcript += messages[i]+"\n";
  }
  return transcript;
}