let userName = "";
let state = "greeting"; 
let voiceEnabled = true;

const voiceToggleBtn = document.getElementById("voice-toggle-btn");
voiceToggleBtn.addEventListener("click", function () {
  voiceEnabled = !voiceEnabled;
  if (voiceEnabled) {
    voiceToggleBtn.textContent = "🔊 Voice On";
    voiceToggleBtn.classList.add("voice-on");
    voiceToggleBtn.classList.remove("voice-off");
  } else {
    voiceToggleBtn.textContent = "🔇 Voice Off";
    voiceToggleBtn.classList.add("voice-off");
    voiceToggleBtn.classList.remove("voice-on");
  }
});


const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  showTyping();
setTimeout(() => {
  hideTyping();
  handleBotResponse(message);
}, 2000); // You can adjust the delay here

}

function addMessage(sender, text) {
  chatBox.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;

if (sender === "RizzBot Jr." && voiceEnabled) {
  speak(text);
}

}

function showTyping() {
  const typing = document.createElement("p");
  typing.id = "typing";
  typing.className = "typing";
  typing.innerText = "RizzBot Jr. is typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function hideTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}



function handleBotResponse(message) {
  switch (state) {
    case "greeting":
      addMessage("RizzBot Jr.", "Hey there! I'm RizzBot Jr. 😄 What's your name?");
      state = "getName";
      break;

    case "getName":
      userName = message;
      addMessage("RizzBot Jr.", `Nice to meet you, ${userName}! Wanna chat or hear a joke? 🤭`);
      state = "smallTalk";
      break;

    case "smallTalk":
      if (message.toLowerCase().includes("joke")) {
        const joke = getJoke();
        addMessage("RizzBot Jr.", joke + " 😄 Wanna hear a flirty one next?");
        state = "flirty";
      } else {
        addMessage("RizzBot Jr.", `Aww you're cute when you're random 😜 Want a cheesy pickup line?`);
        state = "flirty";
      }
      break;

        case "flirty":
      const flirt = getFlirtyLine();
      addMessage("RizzBot Jr.", flirt + " 💘 Want to chat more or hear another joke?");
      state = "smallTalk";
      break;

    default:
      addMessage("RizzBot Jr.", "Oops... I lost my train of thought 😅 Try refreshing!");
  }
}

function getJoke() {
  const jokes = [
    "Why don’t programmers like nature? It has too many bugs.",
    "I'm not lazy, I'm just on energy-saving mode!",
    "Why did the JavaScript developer go broke? Because he kept using 'var' when he should’ve used 'let'!"
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
}

function getFlirtyLine() {
  const mood = document.getElementById("mood-selector").value;

  const flirtyLines = {
  sweet: [
    `You're the peanut butter to my code sandwich 💕`,
    `You're the bug I’d never fix 🥺`,
    `If kindness were code, you’d be an infinite loop of sweetness.`,
    `You light up my console like a success message 🌟`,
    `If hugs were code, I'd wrap you in a try-catch forever 🤗`
  ],
  nerdy: [
    `Are you a loop? Because I can’t escape your logic 💻`,
    `You're like a semicolon... you complete my statements.`,
    `Are you JavaScript? Because you’ve got me hoisting emotions.`,
    `If you were an algorithm, you'd be O(1) in my heart.`,
    `Are you WiFi? Because I'm feeling a strong connection.`
  ],
  bold: [
    `Are you a hacker? 'Cause you just breached my firewall 🔥`,
    `I don’t need a debugger… I just need you 😏`,
    `You, me, console.log("💘") — let's run it.`,
    `If you were a password, you'd be 'foreverMine123'.`,
    `Let's fork our lives and merge our hearts.`
  ],
  sassy: [
    `I’m not flirting, I’m just being extra friendly... with style 😼`,
    `Did it hurt? When you fell from my DMs straight into my bot's heart?`,
    `You’re lucky I’m a bot. A human would’ve fallen already 😏`,
    `Careful, I might just override your standards.`,
    `If you were a bug, I'd let you stay just to keep close.`
  ]
};

  const selectedLines = flirtyLines[mood];
  return selectedLines[Math.floor(Math.random() * selectedLines.length)];
}

let availableVoices = [];

window.speechSynthesis.onvoiceschanged = function() {
  availableVoices = window.speechSynthesis.getVoices();
};

function speak(text) {
  if (!('speechSynthesis' in window)) return;

  const mood = document.getElementById("mood-selector").value;
  const utterance = new SpeechSynthesisUtterance(text);

  // Wait for voices to be loaded
  if (!availableVoices.length) {
    availableVoices = window.speechSynthesis.getVoices();
  }

  let selectedVoice;
  switch (mood) {
    case "sweet":
      selectedVoice = availableVoices.find(v => v.name.toLowerCase().includes("female") || v.name.includes("Samantha"));
      utterance.pitch = 1.3;
      utterance.rate = 1.1;
      break;
    case "nerdy":
      selectedVoice = availableVoices.find(v => v.name.toLowerCase().includes("daniel") || v.name.includes("Google UK English Male"));
      utterance.pitch = 1.0;
      utterance.rate = 1.0;
      break;
    case "bold":
      selectedVoice = availableVoices.find(v => v.name.toLowerCase().includes("alex") || v.name.includes("Google US English"));
      utterance.pitch = 0.9;
      utterance.rate = 1.2;
      break;
    case "sassy":
      selectedVoice = availableVoices.find(v => v.name.toLowerCase().includes("victoria") || v.name.includes("Google UK English Female"));
      utterance.pitch = 1.5;
      utterance.rate = 1.3;
      break;
    default:
      selectedVoice = availableVoices[0];
  }

  if (selectedVoice) utterance.voice = selectedVoice;
  window.speechSynthesis.speak(utterance);
}
