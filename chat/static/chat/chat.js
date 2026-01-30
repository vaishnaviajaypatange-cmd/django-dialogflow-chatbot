const inputBox = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow"); // make sure this exists in chat.html

// Function to append message to chat window
function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = text;
    msgDiv.style.textAlign = sender === "user" ? "right" : "left"; // user on right, bot on left
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // auto scroll
}

// Send message function
function sendMessage() {
    const message = inputBox.value.trim();
    if (!message) {
        console.log("Cannot send empty message!");
        return;
    }

    // Show user's message in chat window
    appendMessage("You: " + message, "user");
    inputBox.value = ""; // clear input box

    // Send to backend
    fetch("https://django-dialogflow-chatbot.onrender.com/api/chatbot-api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }) // MUST be 'message'
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            appendMessage("Bot: Error: " + data.error, "bot");
            console.error("Server error:", data.error);
        } else {
            appendMessage("Bot: " + data.reply, "bot"); // show bot reply
            console.log("Bot reply:", data.reply);
        }
    })
    .catch(err => {
        appendMessage("Bot: Error contacting server", "bot");
        console.error("Fetch error:", err);
    });
}

// Optional: send message when pressing Enter
inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Optional: send message when clicking Send button
const sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", sendMessage);
