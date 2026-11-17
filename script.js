
// PASSWORD SETTINGS
const correctPassword = "RAPUNSAL";

const passwordScreen = document.getElementById("passwordScreen");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const errorMessage = document.getElementById("errorMessage");

const mainWebsite = document.getElementById("mainWebsite");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");


// OPEN THE WEBSITE
passwordForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (passwordInput.value === correctPassword) {
    errorMessage.textContent = "";

    passwordScreen.classList.add("hidden");
    mainWebsite.classList.remove("hidden");

    // Start music after the user's button click.
    try {
      await backgroundMusic.play();
      updateMusicButton(true);
    } catch (error) {
      updateMusicButton(false);
      console.log("Music autoplay was blocked. Use the music button.");
    }

    startRevealAnimations();
    createFloatingHearts();

  } else {
    errorMessage.textContent = "That password doesn't seem right. Try again.";
    passwordInput.value = "";
    passwordInput.focus();
  }
});


// MUSIC PLAY / PAUSE
function updateMusicButton(isPlaying) {
  musicIcon.textContent = isPlaying ? "♫" : "♪";
  musicLabel.textContent = isPlaying ? "Pause music" : "Play music";
}

musicButton.addEventListener("click", async function () {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      updateMusicButton(true);
    } catch (error) {
      updateMusicButton(false);
      console.log("Unable to play music:", error);
    }
  } else {
    backgroundMusic.pause();
    updateMusicButton(false);
  }
});

backgroundMusic.addEventListener("ended", function () {
  updateMusicButton(false);
});


// FADE-IN WHILE SCROLLING
function startRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }
}


// FLOATING HEARTS
function createFloatingHearts() {
  const symbols = ["♡", "♥", "✧"];
  const numberOfHearts = 14;

  for (let i = 0; i < numberOfHearts; i++) {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDelay = Math.random() * 12 + "s";
    heart.style.animationDuration = (12 + Math.random() * 12) + "s";
    heart.style.fontSize = (12 + Math.random() * 15) + "px";

    document.body.appendChild(heart);
  }
}
