function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.className = sender;
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("userMessage");
    const message = input.value.trim();

    if (!message) return;

    addMessage("You: " + message, "user");
    input.value = "";

    fetch("/api/chatbot-api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(res => res.json())
    .then(data => {
        addMessage("Bot: " + data.reply, "bot");
    })
    .catch(() => {
        addMessage("Bot: Error occurred", "bot");
    });
}

document.getElementById("userMessage").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
