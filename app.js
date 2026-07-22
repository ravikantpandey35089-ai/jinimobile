// ===== Element References =====
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// ===== Function: Get current time in HH:MM AM/PM format =====
function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 ko 12 banao
  return `${hours}:${minutes} ${ampm}`;
}

// ===== Function: Add a message bubble to chat window =====
function addMessage(text, sender) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("message", sender);

  const textEl = document.createElement("div");
  textEl.classList.add("message-text");
  textEl.textContent = text;

  const timeEl = document.createElement("div");
  timeEl.classList.add("message-time");
  timeEl.textContent = getCurrentTime();

  messageEl.appendChild(textEl);
  messageEl.appendChild(timeEl);
  chatWindow.appendChild(messageEl);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ===== Function: Show typing indicator =====
function showTypingIndicator() {
  const typingEl = document.createElement("div");
  typingEl.classList.add("message", "jini", "typing");
  typingEl.id = "typing-indicator";
  typingEl.textContent = "Jini type kar rahi hai...";
  chatWindow.appendChild(typingEl);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ===== Function: Remove typing indicator =====
function removeTypingIndicator() {
  const typingEl = document.getElementById("typing-indicator");
  if (typingEl) {
    typingEl.remove();
  }
}

// ===== Function: Handle sending a message =====
function sendMessage() {
  const text = userInput.value.trim();

  if (text === "") return;

  addMessage(text, "user");
  userInput.value = "";

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    addMessage("Yeh ek test reply hai. Backend baad me connect hoga.", "jini");
  }, 1200);
}

// ===== Event Listeners =====
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});