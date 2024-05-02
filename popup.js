// Retrieve and display messages from storage
chrome.storage.local.get(['messages'], function (result) {
    const messages = result.messages || [];
    const messagesDiv = document.getElementById('messages');
    messages.forEach(message => {
      const messageDiv = createMessageDiv(message);
      messagesDiv.appendChild(messageDiv);
    });
  });
  
  // Add event listener for Enter key on the inputMessage
  document.getElementById('inputMessage').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!event.shiftKey) {
        sendMessage();
      } else {
        this.value += '\n';
      }
    }
  });
  
  // Send the message
  document.getElementById('sendMessage').addEventListener('click', sendMessage);
  
  function sendMessage() {
    const input = document.getElementById('inputMessage');
    const message = input.value.trim();
    if (message) {
      const messagesDiv = document.getElementById('messages');
      const messageDiv = createMessageDiv(message);
      messagesDiv.appendChild(messageDiv);
      saveMessage(message);
      input.value = '';
    }
  }
  
  // Save message to storage
  function saveMessage(message) {
    chrome.storage.local.get(['messages'], function (result) {
      const messages = result.messages || [];
      messages.push(message);
      chrome.storage.local.set({ 'messages': messages });
    });
  }
  
  // Clear all messages
  document.getElementById('clearMessages').addEventListener('click', function () {
    document.getElementById('messages').innerHTML = '';
    chrome.storage.local.remove('messages');
  });
  
  // Close popup on click
  document.getElementById('closeButton').addEventListener('click', function () {
    window.close();
  });
  
  // Helper function to create a message div with proper formatting
  function createMessageDiv(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = message.replace(/\n/g, '<br>');
    return messageDiv;
  }
      