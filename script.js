const envelopeScreen = document.getElementById('envelope');
const envelope = document.getElementById('envelopeCard');
const openBtn = document.getElementById('openBtn');
const invitation = document.getElementById('invitation');
const music = document.getElementById('music');
const fallingPetals = document.getElementById('fallingPetals');

document.documentElement.classList.add('locked-page');
document.body.classList.add('locked');

openBtn.addEventListener('click', () => {
  if (envelopeScreen.classList.contains('opening')) return;
  envelopeScreen.classList.add('opening');
  envelope.classList.add('open');
  music.volume = 0.5;
  music.play().catch(() => {});

  setTimeout(() => {
    invitation.classList.add('show');
    invitation.setAttribute('aria-hidden', 'false');
  }, 430);

  setTimeout(() => {
    if (fallingPetals) fallingPetals.classList.add('active');
  }, 1100);

  setTimeout(() => envelopeScreen.classList.add('hide'), 1050);
  setTimeout(() => {
    document.body.classList.remove('locked');
    document.documentElement.classList.remove('locked-page');
    window.scrollTo({top: 0, behavior: 'instant'});
  }, 1900);
});

const weddingDate = new Date('2026-10-24T09:00:00');
function updateCountdown(){
  let diff = weddingDate - new Date();
  if (diff < 0) diff = 0;
  const total = Math.floor(diff / 1000);
  document.getElementById('days').textContent = String(Math.floor(total / 86400)).padStart(2,'0');
  document.getElementById('hours').textContent = String(Math.floor((total % 86400) / 3600)).padStart(2,'0');
  document.getElementById('minutes').textContent = String(Math.floor((total % 3600) / 60)).padStart(2,'0');
  document.getElementById('seconds').textContent = String(total % 60).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const photo = document.querySelector('.photo-fade');
if (photo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const rect = photo.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1,
      (window.innerHeight / 2 - rect.top) / (window.innerHeight + rect.height)
    ));
    photo.style.setProperty('--photo-shift', `${progress * 10}px`);
  }, {passive: true});
}

// PÉTALOS V31 — usando únicamente las dos hojitas pequeñas proporcionadas.
if (fallingPetals) {
  const sources = ['assets/petal-small-1.png'];
  const count = 26;
  const rand = (a, b) => a + Math.random() * (b - a);

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('img');
    petal.className = 'falling-petal';
    petal.src = sources[Math.floor(Math.random() * sources.length)];
    petal.alt = '';
    petal.draggable = false;
    petal.setAttribute('aria-hidden', 'true');

    const size = rand(14, 26);
    const mobileSize = rand(11, 20);
    const duration = rand(18, 29);
    const delay = -rand(0, duration);
    const startX = rand(-2, 102);
    const startY = rand(-15, 95);
    const drift1 = rand(-12, 12);
    const drift2 = rand(-18, 18);
    const drift3 = rand(-14, 14);
    const drift4 = rand(-20, 20);
    const drift5 = rand(-12, 12);
    const opacity = rand(0.35, 0.55);
    const startRot = rand(-40, 40);

    petal.style.setProperty('width', `${size.toFixed(1)}px`, 'important');
    petal.style.setProperty('height', `${size.toFixed(1)}px`, 'important');
    petal.style.setProperty('--leaf-size', `${size.toFixed(1)}px`);
    petal.style.setProperty('--leaf-size-mobile', `${mobileSize.toFixed(1)}px`);
    petal.style.setProperty('--leaf-duration', `${duration.toFixed(1)}s`);
    petal.style.setProperty('--leaf-delay', `${delay.toFixed(2)}s`);
    petal.style.setProperty('--start-x', `${startX.toFixed(1)}vw`);
    petal.style.setProperty('--start-y', `${startY.toFixed(1)}vh`);
    petal.style.setProperty('--drift1', `${drift1.toFixed(1)}vw`);
    petal.style.setProperty('--drift2', `${drift2.toFixed(1)}vw`);
    petal.style.setProperty('--drift3', `${drift3.toFixed(1)}vw`);
    petal.style.setProperty('--drift4', `${drift4.toFixed(1)}vw`);
    petal.style.setProperty('--drift5', `${drift5.toFixed(1)}vw`);
    petal.style.setProperty('--opacity', opacity.toFixed(2));
    petal.style.setProperty('--r0', `${startRot.toFixed(0)}deg`);
    petal.style.setProperty('--r1', `${(startRot + rand(55, 125)).toFixed(0)}deg`);
    petal.style.setProperty('--r2', `${(startRot + rand(150, 240)).toFixed(0)}deg`);
    petal.style.setProperty('--r3', `${(startRot + rand(265, 355)).toFixed(0)}deg`);
    petal.style.setProperty('--r4', `${(startRot + rand(380, 500)).toFixed(0)}deg`);
    petal.style.setProperty('--r5', `${(startRot + rand(520, 680)).toFixed(0)}deg`);

    fallingPetals.appendChild(petal);
  }
}
