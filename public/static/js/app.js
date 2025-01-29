class Chatbox {
  constructor() {
    this.args = {
      sendButton: document.querySelector(".send__button"),
      inputField: document.querySelector(".chatbox__footer input"),
      chatMessages: document.querySelector(".chatbox__messages"),
    };

    this.messages = [];
  }

  display() {
    const { sendButton, inputField } = this.args;

    // Add event listeners for "Send" button and "Enter" key
    sendButton.addEventListener("click", () => this.onSendButton());

    inputField.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton();
      }
    });
  }

  onSendButton() {
    const { inputField } = this.args;
    const messageText = inputField.value.trim();

    // If the message is not empty, add it to the message list
    if (messageText !== "") {
      const userMessage = {
        name: "User",
        message: messageText,
      };

      this.messages.push(userMessage); // Add message to array
      this.updateChatMessages(); // Update chat messages

      // Clear input field
      inputField.value = "";

      // Send the user message to the API and get the response
      this.fetchAPIResponse(messageText);
    }
  }

  fetchAPIResponse(userMessage) {
    // Make a request to the API with the user's message
    fetch("https://backend-chatbot-syfr.onrender.com/predict", {
      method: "POST",
      body: JSON.stringify({ message: userMessage }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Handle the response and add the chatbot's reply to the message list
        const botMessage = {
          name: "Sam", // Name of the bot
          message: data.answer, // Assuming the response has an "answer" field
        };

        this.messages.push(botMessage); // Add the bot's message
        this.updateChatMessages(); // Update chatbox with new messages
      })
      .catch((error) => {
        console.error("Error fetching API response:", error);
      });
  }

  updateChatMessages() {
    const { chatMessages } = this.args;
    let html = "";

    // Loop through the messages and display them
    this.messages.forEach((item) => {
      if (item.name === "Sam") {
        html += `<div class="messages__item messages__item--visitor">${item.message}</div>`;
      } else {
        html += `<div class="messages__item messages__item--operator">${item.message}</div>`;
      }
    });

    // Insert the updated message HTML into the chat container
    chatMessages.innerHTML = html;

    // Scroll to the bottom of the chatbox to show the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Initialize and display the chatbox
const chatbox = new Chatbox();
chatbox.display();
