/* ============================================================================
   CONFIGURATION & CONSTANTS
   ============================================================================ */
const CONFIG = {
  particles: {
    count: window.innerWidth < 768 ? 20 : 50,
    minSize: 2,
    maxSize: 8,
    minOpacity: 0.3,
    maxOpacity: 0.8,
    duration: 12000,
  },
  emojis: {
    list: ["❤️", "😎", "🎯", "✨", "🥳"],
    size: window.innerWidth < 768 ? "20px" : "32px",
    interval: 3000,
  },
  animations: {
    shakeIntensity: 5,
    transitionSmooth: 300,
    typingSpeed: 30,
  },
  noButton: {
    moveThreshold: 5,
    colorChangeThreshold: 8,
    fireThreshold: 11,
  },
};

/* ============================================================================
   GLOBAL STATE
   ============================================================================ */
let state = {
  currentQuestion: 0,
  noClickCount: 0,
  soundEnabled: localStorage.getItem("soundEnabled") !== "false",
  gameActive: true,
  isTyping: false,
};

/* ============================================================================
   DOM ELEMENTS
   ============================================================================ */
const DOM = {
  question: document.getElementById("question"),
  yesButton: document.getElementById("yes-button"),
  noButton: document.getElementById("no-button"),
  soundToggle: document.querySelector(".sound-toggle"),
  progressIndicator: document.querySelector(".progress-indicator"),
  successModal: document.getElementById("success-modal"),
  particlesContainer: document.getElementById("particles-container"),
  emojisContainer: document.getElementById("emojis-container"),
  chessPieces: document.getElementById("chess-pieces"),
};

/* ============================================================================
   DIALOGUES - Enhanced Hindi with cleaner, funnier conversational style
   ============================================================================ */
const DIALOGUES = [
  {
    text: "Bann Gya Project 😎",
    action: null,
  },
  {
    text: "Arre bhai! Bann Gya Project 🔥",
    action: null,
  },
  {
    text: "Haan haan, ho gaya finish! 🥳",
    action: null,
  },
  {
    text: "Arre matlab itne bhaaw dene se? Achhe bachche aise nahin karte! 😤",
    action: null,
  },
  {
    text: "Mene jo bhi reason diya hoga, ab bas YES daba de! 🙏",
    action: () => {
      playSound("click");
      prompt("Batao bhai, kyu nahi keh rahe YES?", "Chalo, Bann Gya Project 🎯");
    },
  },
  {
    text: "Firse NO dabaya? 😠",
    action: null,
  },
  {
    text: "Dikkat kya hai bhai??? Kyu nahin daba rahe YES?? 🤨",
    action: null,
  },
  {
    text: "Background achha nahin hai kya? Theek hai, theek hai... mai color badal deta hun! 🌈",
    action: () => {
      DOM.question.style.backgroundColor = "rgba(255, 105, 180, 0.2)";
    },
  },
  {
    text: "Achha ab kaisa lag raha hai? Accha na? Abh YES daba de! ✨",
    action: null,
  },
  {
    text: "Kya chakkar hai? YES button dikh raha hai na?? 👀",
    action: null,
  },
  {
    text: "Lo lo! Ab size bada kar deta hun! Dekh raha hai na? BADA BUTTON! 📢",
    action: () => {
      DOM.yesButton.style.fontSize = "1.8em";
      DOM.yesButton.style.padding = "20px 50px";
    },
  },
  {
    text: "Khabardaar! Ek aur NO dabaya to... 😡",
    action: null,
  },
  {
    text: "💢 Dimag kharab kar diya tune! 💢",
    action: null,
  },
  {
    text: "Ab to aag laga denge NO button ko! 🔥",
    action: null,
  },
  {
    text: "🔥 NO KA BUTTON JALA DIA! 🔥 Ab YES daba PEHLE ungli jal jayegi! 🤕",
    action: () => {
      DOM.noButton.innerHTML = "🔥 NO 🔥";
      DOM.noButton.style.background = "linear-gradient(135deg, #ff4444 0%, #ff8844 100%)";
    },
  },
  {
    text: "Achhhhh!!! 🩹 Soch to nahin tha ungli jal jayegi to kaun banayega?? 😂",
    action: null,
  },
  {
    text: "Dekh yaar, itna jhunjhuna tu ho gaya! 🎪",
    action: null,
  },
  {
    text: "Ab to haan karni padegi! Nahin to main aur bhi kuch kar dunga! 😈",
    action: null,
  },
  {
    text: "Om bhatt shua haa... ✨ Magic! ✨",
    action: () => {
      DOM.yesButton.style.display = "none";
    },
  },
  {
    text: "Abe! YES ka button kahan gaya?? 😱 Zaraa wait... magician nahi hoon maine! 🧙",
    action: null,
  },
  {
    text: "Abra Kadabra Alakazam! ✨ POOF! ✨",
    action: () => {
      DOM.yesButton.style.display = "inline-block";
    },
  },
  {
    text: "Ab mere paas koi option nahin raha! YES hi YES hai! 😏",
    action: null,
  },
  {
    text: "😏 Samajh gaya na? Bas YES ka button set hai ab! 😏",
    action: () => {
      DOM.noButton.style.display = "none";
    },
  },
];

/* ============================================================================
   PARTICLE SYSTEM
   ============================================================================ */
class Particle {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "particle active";
    this.size = Math.random() * (CONFIG.particles.maxSize - CONFIG.particles.minSize) + CONFIG.particles.minSize;
    this.opacity = Math.random() * (CONFIG.particles.maxOpacity - CONFIG.particles.minOpacity) + CONFIG.particles.minOpacity;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = -Math.random() * 2 - 1;
    this.duration = CONFIG.particles.duration;

    this.element.style.width = this.size + "px";
    this.element.style.height = this.size + "px";
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.opacity = this.opacity;
    this.element.style.animation = `particleFloat ${this.duration}ms linear infinite`;
  }

  render() {
    DOM.particlesContainer.appendChild(this.element);
  }

  destroy() {
    this.element.remove();
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.enabled = true;
  }

  init() {
    for (let i = 0; i < CONFIG.particles.count; i++) {
      const particle = new Particle();
      particle.render();
      this.particles.push(particle);
    }
  }

  addParticle() {
    if (!this.enabled) return;
    const particle = new Particle();
    particle.render();
    this.particles.push(particle);
    setTimeout(() => particle.destroy(), CONFIG.particles.duration);
  }

  destroy() {
    this.particles.forEach((p) => p.destroy());
    this.particles = [];
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.destroy();
    } else {
      this.init();
    }
  }
}

const particleSystem = new ParticleSystem();

/* ============================================================================
   FLOATING EMOJIS
   ============================================================================ */
class FloatingEmoji {
  constructor(emoji) {
    this.element = document.createElement("div");
    this.element.className = "floating-emoji active";
    this.element.textContent = emoji;
    this.element.style.fontSize = CONFIG.emojis.size;
    this.element.style.left = Math.random() * window.innerWidth + "px";
    this.element.style.top = window.innerHeight + "px";
    this.element.style.animation = `emojiFloat ${CONFIG.emojis.interval}ms ease-out forwards`;
  }

  render() {
    DOM.emojisContainer.appendChild(this.element);
  }

  destroy() {
    this.element.remove();
  }
}

class FloatingEmojiManager {
  constructor() {
    this.interval = null;
    this.isActive = true;
  }

  init() {
    this.interval = setInterval(() => {
      if (this.isActive) {
        const emoji = CONFIG.emojis.list[Math.floor(Math.random() * CONFIG.emojis.list.length)];
        const floatingEmoji = new FloatingEmoji(emoji);
        floatingEmoji.render();
        setTimeout(() => floatingEmoji.destroy(), CONFIG.emojis.interval);
      }
    }, CONFIG.emojis.interval);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isActive = false;
  }

  start() {
    this.isActive = true;
    this.init();
  }
}

const emojiManager = new FloatingEmojiManager();

/* ============================================================================
   CONFETTI EFFECT
   ============================================================================ */
class Confetti {
  constructor() {
    this.particles = [];
  }

  burst() {
    const count = 50;
    const origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const velocity = 5 + Math.random() * 10;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      const duration = 2 + Math.random() * 1;
      const rotation = Math.random() * 360;

      const particle = document.createElement("div");
      particle.className = "confetti";
      particle.style.left = origin.x + "px";
      particle.style.top = origin.y + "px";
      particle.style.width = "8px";
      particle.style.height = "8px";
      particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      particle.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      particle.style.pointerEvents = "none";
      particle.style.position = "fixed";
      particle.style.zIndex = "999";

      // Use CSS custom properties for animation variables
      particle.style.setProperty("--vx", vx * 100);
      particle.style.setProperty("--vy", vy * 100 + 300);
      particle.style.setProperty("--rotation", rotation);
      particle.style.animation = `confettiBurst ${duration}s ease-out forwards`;

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    }

    playSound("confetti");
  }
}

const confetti = new Confetti();

/* ============================================================================
   SOUND MANAGEMENT
   ============================================================================ */
const SOUNDS = {
  click: "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
  confetti: "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
  shake: "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
};

function playSound(soundName) {
  if (!state.soundEnabled) return;

  try {
    const audio = new Audio(SOUNDS[soundName] || "");
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Silently fail if audio doesn't play
    });
  } catch (e) {
    // Silently fail
  }
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  localStorage.setItem("soundEnabled", state.soundEnabled);
  updateSoundToggle();
}

function updateSoundToggle() {
  if (DOM.soundToggle) {
    DOM.soundToggle.textContent = state.soundEnabled ? "🔊" : "🔇";
  }
}

/* ============================================================================
   TEXT TYPING ANIMATION
   ============================================================================ */
async function typeText(text, element, speed = CONFIG.animations.typingSpeed) {
  state.isTyping = true;
  element.innerHTML = "";

  // Create a temporary div to parse HTML safely
  const temp = document.createElement("div");
  temp.innerHTML = text;

  // Extract text content for typing
  const plainText = temp.textContent;
  const htmlContent = text;

  // For safety, just set innerHTML if it contains HTML
  if (htmlContent !== plainText) {
    element.innerHTML = htmlContent;
    state.isTyping = false;
    return;
  }

  // Otherwise, do character-by-character typing
  for (let i = 0; i < plainText.length; i++) {
    element.textContent = plainText.substring(0, i + 1);
    await new Promise((resolve) => setTimeout(resolve, speed));
  }

  state.isTyping = false;
}

/* ============================================================================
   BUTTON INTERACTIONS
   ============================================================================ */
function handleNoClick() {
  if (!state.gameActive) return;

  state.noClickCount++;
  playSound("click");

  // Show progress indicator after first NO click
  if (state.noClickCount === 1) {
    DOM.progressIndicator.classList.add("active");
  }

  // Update progress
  updateProgress();

  // Handle NO button challenges
  handleNoButtonChallenge();

  // Change question
  if (state.currentQuestion < DIALOGUES.length - 1) {
    state.currentQuestion++;
    updateQuestion();
  }
}

function handleNoButtonChallenge() {
  const count = state.noClickCount;

  // Shake effect for all NO clicks
  DOM.noButton.classList.add("shake");
  playSound("shake");
  setTimeout(() => DOM.noButton.classList.remove("shake"), 400);

  // Move button after 5 clicks
  if (count >= CONFIG.noButton.moveThreshold && count < CONFIG.noButton.fireThreshold + 5) {
    moveNoButton();
  }

  // Change color after 8 clicks
  if (count === CONFIG.noButton.colorChangeThreshold) {
    DOM.noButton.style.background = "linear-gradient(135deg, #ff9500 0%, #ff6b00 100%)";
  }

  // Change colors dynamically every few clicks
  if (count > CONFIG.noButton.colorChangeThreshold && count % 2 === 0) {
    const colors = [
      "linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)",
      "linear-gradient(135deg, #ff9500 0%, #ff6b00 100%)",
      "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)",
      "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)",
    ];
    DOM.noButton.style.background = colors[Math.floor(Math.random() * colors.length)];
  }
}

function moveNoButton() {
  const randomX = (Math.random() - 0.5) * 200;
  const randomY = (Math.random() - 0.5) * 100;
  DOM.noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function updateProgress() {
  const progress = `NO Clicks: ${state.noClickCount} / ${DIALOGUES.length}`;
  DOM.progressIndicator.textContent = progress;

  // Change color based on progress
  const ratio = state.noClickCount / DIALOGUES.length;
  if (ratio < 0.3) {
    DOM.progressIndicator.style.color = "#00ff00";
  } else if (ratio < 0.6) {
    DOM.progressIndicator.style.color = "#ffff00";
  } else if (ratio < 0.85) {
    DOM.progressIndicator.style.color = "#ff9500";
  } else {
    DOM.progressIndicator.style.color = "#ff0000";
  }
}

async function handleYesClick() {
  if (!state.gameActive) return;

  state.gameActive = false;
  playSound("click");

  // Launch confetti
  confetti.burst();

  // Show success modal
  showSuccessModal();

  // Redirect after 3 seconds
  setTimeout(() => {
    window.location.href = "https://wa.me/917982537040?text=Bann%20Gya%20Project%20%F0%9F%8E%89%20I%20love%20this%20interactive%20website!%20%E2%9D%A4%EF%B8%8F";
  }, 3000);
}

function showSuccessModal() {
  DOM.successModal.classList.add("show");

  // Create confetti-like celebration
  const confettiPieces = 20;
  for (let i = 0; i < confettiPieces; i++) {
    setTimeout(() => {
      confetti.burst();
    }, i * 150);
  }
}

function updateQuestion() {
  const dialogue = DIALOGUES[state.currentQuestion];
  if (!dialogue) return;

  // Type the question
  typeText(dialogue.text, DOM.question);

  // Execute action if exists
  if (dialogue.action) {
    setTimeout(() => {
      dialogue.action();
    }, 200);
  }
}

/* ============================================================================
   CHESS PIECES BACKGROUND
   ============================================================================ */
function initChessPieces() {
  const pieces = ["♟", "♖", "♗", "♘"];
  pieces.forEach((piece) => {
    const el = document.createElement("div");
    el.className = "chess-piece no-select";
    el.textContent = piece;
    DOM.chessPieces.appendChild(el);
  });
}

/* ============================================================================
   INITIALIZATION
   ============================================================================ */
function init() {
  // Initialize particles
  particleSystem.init();

  // Initialize floating emojis
  emojiManager.init();

  // Initialize chess pieces
  initChessPieces();

  // Set up event listeners
  DOM.yesButton.addEventListener("click", handleYesClick);
  DOM.noButton.addEventListener("click", handleNoClick);

  if (DOM.soundToggle) {
    DOM.soundToggle.addEventListener("click", toggleSound);
    updateSoundToggle();
  }

  // Display first question with animation
  updateQuestion();

  // Page entrance animation
  document.querySelector(".card-container").style.animation = "cardEntrance 0.6s ease-out";

  // Log initialization
  console.log("✨ Bann Gya Project Initialized! ✨");
}

/* ============================================================================
   EVENT LISTENERS
   ============================================================================ */
window.addEventListener("load", init);

// Adjust particles on window resize
window.addEventListener("resize", () => {
  const newCount = window.innerWidth < 768 ? 20 : 50;
  if (CONFIG.particles.count !== newCount) {
    CONFIG.particles.count = newCount;
    particleSystem.destroy();
    particleSystem.init();
  }
});

/* ============================================================================
   UTILITY FUNCTIONS
   ============================================================================ */
function disablePointerEvents() {
  DOM.yesButton.style.pointerEvents = "none";
  DOM.noButton.style.pointerEvents = "none";
}

function enablePointerEvents() {
  DOM.yesButton.style.pointerEvents = "auto";
  DOM.noButton.style.pointerEvents = "auto";
}

// Export for debugging (optional)
window.DEBUG = {
  state,
  CONFIG,
  particleSystem,
  emojiManager,
  confetti,
  playSound,
  toggleSound,
};
