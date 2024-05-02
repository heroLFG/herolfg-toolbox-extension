document.getElementById("closeButton").addEventListener("click", function () {
    window.close();
  });
  
  document.getElementById("sendMessage").addEventListener("click", function () {
    const message = document.getElementById("inputMessage").value;
    if (message.trim()) {
      const messageDiv = document.createElement("div");
      messageDiv.textContent = message;
      document.getElementById("messages").appendChild(messageDiv);
      document.getElementById("inputMessage").value = "";
    }
  });
  