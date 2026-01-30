function sendMessage(message) {
    fetch("https://django-dialogflow-chatbot.onrender.com/api/chatbot-api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("Server error:", data.error);
        } else {
            console.log("Bot reply:", data.reply);
        }
    })
    .catch(err => console.error("Fetch error:", err));
}
