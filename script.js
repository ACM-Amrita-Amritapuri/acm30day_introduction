// === Typing Header ===
const text = "The 30-Day Challenge";
const typeTarget = document.getElementById("typing-text");
let index = 0;

function typeWriter() {
  if (index < text.length) {
    typeTarget.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 70);
  }
}

// === Typing Console Lines ===
function typeConsoleLines() {
  const consoleLines = document.querySelectorAll("#intro-console .line");
  if (consoleLines.length === 0) return;

  let totalChars = Array.from(consoleLines).reduce((sum, line) => sum + (line.getAttribute("data-line-text")?.length || 0), 0);
  let currentCharIndex = 0;
  let linesText = Array.from(consoleLines).map(line => line.getAttribute("data-line-text") || "");

  function typeNextCharacter() {
    if (currentCharIndex < totalChars) {
      let charCountSoFar = 0;
      for (let i = 0; i < consoleLines.length; i++) {
        let lineLength = linesText[i].length;
        if (currentCharIndex >= charCountSoFar && currentCharIndex < charCountSoFar + lineLength) {
          let charIndexInLine = currentCharIndex - charCountSoFar;
          consoleLines[i].innerHTML = linesText[i].slice(0, charIndexInLine + 1);
          consoleLines[i].style.opacity = "1";
          break;
        }
        charCountSoFar += lineLength;
      }
      currentCharIndex++;
      setTimeout(() => {
        typeNextCharacter();
        consoleLines.forEach(line => line.getBoundingClientRect());
      }, 30);
    } else {
      consoleLines.forEach(line => line.style.opacity = "1");
    }
  }

  consoleLines.forEach(line => (line.innerHTML = ""));
  setTimeout(typeNextCharacter, 100);
}

// === DOM Ready Handler ===
document.addEventListener("DOMContentLoaded", () => {
  typeWriter();
  typeConsoleLines();

  // === SIG Flip Cards ===
  const sigCards = document.querySelectorAll(".sig-card");
  sigCards.forEach(card => {
    card.addEventListener("click", () => {
      if (card.classList.contains("flipped")) {
        card.classList.remove("flipped");
      } else {
        sigCards.forEach(c => c.classList.remove("flipped"));
        card.classList.add("flipped");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  // === Challenge Box Terminal ===
  const challengeBox = document.querySelector(".challenge-zero");
  if (challengeBox) {
    challengeBox.addEventListener("dblclick", () => {
      document.getElementById("terminalModal").classList.add("active");
    });
    challengeBox.addEventListener("mouseenter", () => {
      challengeBox.classList.add("hover");
    });
    challengeBox.addEventListener("mouseleave", () => {
      challengeBox.classList.remove("hover");
    });
  }

  // === Scroll Fade-in Observer ===
  const sections = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach(section => observer.observe(section));

  // === ASCII Banner ===
  const ascii = `
   ____ _          _ _       
   █████████                                                                                               █████
  ███░░░░░███                                                                                             ░░███ 
 ███     ░░░  ██████     ████████       ████████    █████ ████     ██████     ████████      ██████      ███████ 
░███         ███░░███   ░░███░░███     ███░░███    ░░███ ░███     ███░░███   ░░███░░███    ███░░███    ███░░███ 
░███        ░███ ░███    ░███ ░███    ░███ ░███     ░███ ░███    ░███████     ░███ ░░░    ░███████    ░███ ░███ 
░░███     ██░███ ░███    ░███ ░███    ░███ ░███     ░███ ░███    ░███░░░      ░███        ░███░░░     ░███ ░███ 
 ░░█████████░░██████     ████ █████   ░░███████     ░░████████   ░░██████     █████       ░░██████    ░░████████
  ░░░░░░░░░  ░░░░░░     ░░░░ ░░░░░     ░░░░░███      ░░░░░░░░     ░░░░░░     ░░░░░         ░░░░░░      ░░░░░░░░ 
                                           ░███                                                                 
                                           █████                                                                
                                          ░░░░░                                                                 
  ACM Student Chapter — Challenge 0
  `;
  const bannerEl = document.getElementById("asciiBanner");
  if (bannerEl) bannerEl.textContent = ascii;

  // === Register Button ===
  const registerBtn = document.getElementById("register-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      window.open("https://aseam.acm.org/join/register.php", "_blank");
    });
  }

  // === Terminal Modal Click Outside to Close ===
  document.addEventListener("click", (e) => {
    const modal = document.getElementById("terminalModal");
    if (modal && modal.classList.contains("active") && !modal.contains(e.target) && !e.target.classList.contains("challenge-zero")) {
      modal.classList.remove("active");
    }
  });
});
