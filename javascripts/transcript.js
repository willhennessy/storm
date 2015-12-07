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
  		+"1st choice = 3 votes\n2nd choice = 2 votes\n3rd choice = 1 vote\n\n"
  		+generateIdeasTranscript(session.ideas)
  		+"==== Chat Log ====\n"
  		+generateChatTranscript(session.messages);
}

function generateIdeasTranscript(ideas) {
  var transcript = "";
  for (i = 0; i < ideas.length; i++) {
    var idea = ideas[i];
    if (idea) {
      transcript +=
        idea.title+"\n"
        +idea.description+"\n"
        +"Votes: "+idea.votes+"\n\n";
    }
  }
  return transcript;
}

function generateChatTranscript(messages) {
  var log = "";
  for (var k in messages) {
  	log += messages[k].text+"\n";
  }
  return log;
}
