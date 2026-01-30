function sendMessage() {
    const inputBox = document.getElementById("userInput"); // your input element ID
    const message = inputBox.value.trim(); // remove extra spaces

    if (!message) {
        console.log("Cannot send empty message!");
        return;
    }

    fetch("https://django-dialogflow-chatbot.onrender.com/api/chatbot-api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })  // MUST be 'message'
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("Server error:", data.error);
        } else {
            console.log("Bot reply:", data.reply);
            // Optionally, append data.reply to your chat UI
        }
    })
    .catch(err => console.error("Fetch error:", err));

    inputBox.value = ""; // clear input box after sending
}
