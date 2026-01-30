document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("userInput");
    const chatBox = document.getElementById("chat-box");
    const sendBtn = document.getElementById("sendBtn");

    // Function to append messages to chat box
    function appendMessage(sender, text) {
        const msg = document.createElement("div");
        msg.className = sender; // "user" or "bot"
        msg.textContent = text;
        chatBox.appendChild(msg);
        chatBox.scrollTop = chatBox.scrollHeight; // auto scroll
    }

    // Send message function
    function sendMessage() {
        const message = inputBox.value.trim();
        if (!message) return; // ignore empty messages

        appendMessage("user", message); // show user's message

        // Send to your API
        fetch("/api/chatbot-api/", { // Replace with your full Render URL if needed
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        })
        .then(res => res.json())
        .then(data => {
            appendMessage("bot", data.reply || "No reply from bot.");
        })
        .catch(err => appendMessage("bot", "Error: " + err));

        inputBox.value = ""; // clear input box
    }

    // Attach event listeners
    sendBtn.addEventListener("click", sendMessage);
    inputBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendMessage(); // send on Enter key
    });
});
