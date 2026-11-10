const floatingLayer = document.getElementById("floatingLayer");
const symbols = ["♥", "♡", "♪", "♫", "✧", "❀"];
let floatTimer;

function makeFloatingSymbol() {
  if (!floatingLayer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const item = document.createElement("span");
  const isNote = Math.random() > 0.58;
  item.className = "float-symbol" + (isNote ? " note" : "");
  item.textContent = isNote ? (Math.random() > 0.5 ? "♫" : "♪") : (Math.random() > 0.5 ? "♥" : "♡");
  item.style.left = `${Math.random() * 100}%`;
  item.style.fontSize = `${12 + Math.random() * 18}px`;
  item.style.setProperty("--drift", `${Math.round(Math.random() * 150 - 75)}px`);
  item.style.setProperty("--spin", `${Math.round(Math.random() * 100 - 50)}deg`);
  item.style.animationDuration = `${8 + Math.random() * 8}s`;
  floatingLayer.appendChild(item);
  window.setTimeout(() => item.remove(), 17000);
}
floatTimer = window.setInterval(makeFloatingSymbol, 1150);
for (let i = 0; i < 8; i++) window.setTimeout(makeFloatingSymbol, i * 420);

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
menuToggle?.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Countdown to the muhurtham. The browser's local timezone is used.
const weddingDate = new Date("2026-11-15T22:14:00");
const pad = value => String(value).padStart(2, "0");
function updateCountdown() {
  const now = new Date();
  let diff = Math.max(0, weddingDate.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000); diff %= 86400000;
  const hours = Math.floor(diff / 3600000); diff %= 3600000;
  const minutes = Math.floor(diff / 60000); diff %= 60000;
  const seconds = Math.floor(diff / 1000);
  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
  if (weddingDate.getTime() <= now.getTime()) {
    document.querySelector(".countdown-date").textContent = "The wedding day is here — let the celebrations begin!";
  }
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

let musicDisabledByUser = false;
let musicStartPending = false;

// Music starts only after a user gesture so browsers do not block playback.
async function startMusic() {
  const music = document.getElementById("weddingMusic");
  const button = document.getElementById("musicToggle");
  const label = document.getElementById("musicLabel");
  const icon = document.getElementById("musicIcon");
  if (!music || !button || !label || !icon || !music.paused || musicStartPending) return;

  musicStartPending = true;
  try {
    await music.play();
    button.setAttribute("aria-pressed", "true");
    label.textContent = "Music on";
    icon.textContent = "♫";
  } catch {
    button.setAttribute("aria-pressed", "false");
    label.textContent = "Tap to play music";
    icon.textContent = "♪";
  } finally {
    musicStartPending = false;
  }
}

function toggleMusic() {
  const music = document.getElementById("weddingMusic");
  if (!music) return;

  if (music.paused) {
    musicDisabledByUser = false;
    startMusic();
  } else {
    musicDisabledByUser = true;
    music.pause();
    document.getElementById("musicToggle")?.setAttribute("aria-pressed", "false");
    document.getElementById("musicLabel").textContent = "Play music";
    document.getElementById("musicIcon").textContent = "♪";
  }
}
document.getElementById("musicToggle")?.addEventListener("click", toggleMusic);
function startMusicOnScroll(event) {
  if (musicDisabledByUser) return;
  if (event.target instanceof Element && event.target.closest("#musicToggle")) return;
  startMusic();
}
window.addEventListener("scroll", startMusicOnScroll, { passive: true });
window.addEventListener("wheel", startMusicOnScroll, { passive: true });
window.addEventListener("touchstart", startMusicOnScroll, { passive: true });

// Demo-only RSVP: it does not send or store personal details.
document.getElementById("rsvpForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const guest = String(data.get("guestName") || "").trim();
  const attendance = String(data.get("attendance") || "");
  const count = String(data.get("guests") || "1");
  const note = document.getElementById("formNote");
  note.textContent = `Thank you, ${guest}! Your response “${attendance}” for ${count} guest(s) has been noted in this preview. No details were sent or saved.`;
  event.currentTarget.reset();
  for (let i = 0; i < 9; i++) window.setTimeout(makeFloatingSymbol, i * 90);
});

// Back-to-top visibility
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => backToTop.classList.toggle("visible", window.scrollY > 500), { passive: true });
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Progressive Web App service worker
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => { }));
}
