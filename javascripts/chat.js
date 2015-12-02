/*
 *  This chatroom is taken from an open source demo from Firebase's website.
 *  https://www.firebase.com/tutorial/#session/eyp1ahkqfej
 */
var messagesRef = new Firebase(getChatUrl(getFirebaseKey()));

var messageField = $('#message-input');
var messageList = $('#message-list');

// LISTEN FOR KEYPRESS EVENT
messageField.keypress(function (e) {
  if (e.keyCode == 13) {
    var message = messageField.val();

    messagesRef.push({text:message});
    messageField.val('');
  }
});

// Callback function that is triggered when the Firebase db is updated
messagesRef.limitToLast(10).on('child_added', function (snapshot) {
  var data = snapshot.val();
  var message = data.text;

  var messageElement = $("<li>");
  messageElement.text(message);//.prepend(nameElement);

  messageList.append(messageElement)
  messageList[0].scrollTop = messageList[0].scrollHeight;
});