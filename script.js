const gift = document.querySelector('#gift');
const openButton = document.querySelector('#openGift');
const petals = document.querySelector('#petals');
const secret = document.querySelector('#secret');
const passwordGate = document.querySelector('#passwordGate');
const passwordForm = document.querySelector('#passwordForm');
const passwordInput = document.querySelector('#passwordInput');
const passwordError = document.querySelector('#passwordError');
const musicButton = document.querySelector('#musicButton');
const musicPlayer = document.querySelector('#musicPlayer');
const musicClose = document.querySelector('#musicClose');
const musicBackdrop = document.querySelector('#musicBackdrop');
const songAudio = document.querySelector('#songAudio');

function openMusic() {
  musicPlayer.classList.add('open');
  musicPlayer.setAttribute('aria-hidden', 'false');
  musicClose.focus();
  songAudio.play().catch(() => {});
}

function closeMusic() {
  musicPlayer.classList.remove('open');
  musicPlayer.setAttribute('aria-hidden', 'true');

  musicButton.focus();
}

musicButton.addEventListener('click', openMusic);
musicClose.addEventListener('click', closeMusic);
musicBackdrop.addEventListener('click', closeMusic);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && musicPlayer.classList.contains('open')) closeMusic();
});

function unlockPage() {
  sessionStorage.setItem('flowersUnlocked', 'yes');
  passwordGate.classList.add('unlocked');
  document.body.classList.remove('gate-locked');
  setTimeout(() => passwordInput.blur(), 100);
}

if (sessionStorage.getItem('flowersUnlocked') === 'yes') unlockPage();

passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const enteredPassword = passwordInput.value.trim();
  if (enteredPassword === '13122023') {
    passwordError.textContent = '';
    unlockPage();
    songAudio.play().catch(() => {});
    makePetals(22);
    return;
  }

  passwordError.textContent = 'Esa no es nuestra fecha, mi gordita 💛';
  passwordInput.select();
  const row = passwordForm.querySelector('.password-row');
  row.classList.remove('shake');
  void row.offsetWidth;
  row.classList.add('shake');
});

function makePetals(count = 28) {
  const symbols = ['🌼', '🌻', '💛', '✦'];
  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.fontSize = `${0.7 + Math.random() * 1.1}rem`;
    petal.style.animationDuration = `${5 + Math.random() * 5}s`;
    petal.style.animationDelay = `${Math.random() * 2.5}s`;
    petal.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
    petals.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove());
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('bouquet-section')) makePetals(16);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

openButton.addEventListener('click', () => {
  gift.classList.add('open');
  gift.setAttribute('aria-hidden', 'false');
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  makePetals();
  setTimeout(() => gift.scrollIntoView({ behavior: 'smooth' }), 250);
});

document.querySelector('#moreLove').addEventListener('click', () => {
  secret.classList.add('show');
  makePetals(18);
});
