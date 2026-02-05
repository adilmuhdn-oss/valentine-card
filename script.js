console.log("JS LOADED");

/* =========================
   SWITCH SCREEN FUNCTION
========================= */
function switchScreen(targetScreenId) {
  console.log("Switching to:", targetScreenId);
  
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show target screen
  const targetScreen = document.getElementById(targetScreenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    console.log("Screen activated:", targetScreenId);
  } else {
    console.error("Screen not found:", targetScreenId);
  }
}

const bgMusic = document.getElementById('bgMusic');

bgMusic.volume = 0.18; // ⭐ very important (lofi should be soft)

function startMusicOnce() {
  bgMusic.play().catch(()=>{});
  document.removeEventListener('click', startMusicOnce);
}

document.addEventListener('click', startMusicOnce);

function startMusicOnce() {
  bgMusic.volume = 0;
  bgMusic.play().catch(()=>{});

  let v = 0;
  const fade = setInterval(() => {
    v += 0.02;
    bgMusic.volume = Math.min(v, 0.18);
    if (v >= 0.18) clearInterval(fade);
  }, 120);

  document.removeEventListener('click', startMusicOnce);
}


/* =========================
   GET ALL ELEMENTS
========================= */
const walkKitty = document.getElementById("walkKitty");
const bigKitty = document.getElementById("bigKitty");
const mail = document.getElementById("mail");
const envelope = document.getElementById("envelope");
const continueBtn = document.querySelector('.continue-btn');
const heart = document.querySelector('.heart');
const overlay = document.querySelector('.transition-overlay');

/* =========================
   FLAGS TO PREVENT ISSUES
========================= */
let envelopeOpened = false;
let transitionInProgress = false;





/* =========================
   SCREEN 1: WALK → BIG KITTY
========================= */
const hint = document.querySelector('.hint');

walkKitty.addEventListener("animationend", () => {
  walkKitty.style.display = "none";
  bigKitty.classList.remove("hidden");

  console.log("Big kitty appeared");

  // ⏳ show bubble after 1s
  setTimeout(() => {
    hint.classList.add('show');
  }, 1000);
});


/* =========================
   SCREEN 1: CLICK LETTER → SCREEN 2
========================= */
mail.addEventListener('click', () => {

  mailSfx.currentTime = 0;
  mailSfx.play().catch(()=>{});

  switchScreen('screen2');


  
  // Reset flags when entering Screen 2
  envelopeOpened = false;
  transitionInProgress = false;
});

/* =========================
   SCREEN 2: OPEN ENVELOPE
========================= */

const sparkleSfx = document.getElementById('sparkleSfx');
sparkleSfx.volume = 0.4;

const mailSfx = document.getElementById('mailSfx');
mailSfx.volume = 0.25;


envelope.addEventListener("click", function() {

  if (!envelopeOpened) {

    this.classList.add('open');
    envelopeOpened = true;

    // ✨ play sparkle sound
    sparkleSfx.currentTime = 0;
    sparkleSfx.play();

    console.log("ENVELOPE OPENED");
  }
});

envelope.addEventListener("click", function() {
  // Only open if not already opened
  if (!envelopeOpened) {
    this.classList.add('open');
    envelopeOpened = true;
    console.log("ENVELOPE OPENED");
    
    // Show continue button after 4 seconds
    setTimeout(() => {
      continueBtn.classList.remove('hidden');
      continueBtn.style.display = 'block';
      console.log("CONTINUE BUTTON SHOWN");
    }, 4000);
  } else {
    console.log("Envelope already opened, ignoring click");
  }
});
 const container = document.querySelector('.bg-hearts');

function spawnHeart(){
  const h = document.createElement('span');
  h.innerHTML = '💗';

  const types = ['small','mid','big'];
  h.classList.add(types[Math.floor(Math.random()*3)]);

  h.style.left = Math.random()*100 + 'vw';

  container.appendChild(h);

  setTimeout(()=>h.remove(),15000);
}

setInterval(spawnHeart, 500);



/* =========================
   SCREEN 2: CONTINUE BUTTON → SCREEN 3
========================= */

const clickSfx = document.getElementById('clickSfx');
clickSfx.volume = 0.35;



continueBtn.addEventListener('click', () => {

  clickSfx.currentTime = 0;
  clickSfx.play().catch(() => {});

  // Prevent multiple clicks
  if (transitionInProgress) {
    console.log("Transition already in progress, ignoring click");
    return;
  }

  transitionInProgress = true;

  transitionInProgress = true;
  console.log("CONTINUE CLICKED - Starting transition");
  
  // Step 1: Immediately hide and disable button
  continueBtn.classList.add('hidden');
  continueBtn.style.display = 'none';
  continueBtn.style.pointerEvents = 'none';
  
  // Step 2: Make heart float away (300ms delay)
  setTimeout(() => {
    heart.classList.add('floating');
    console.log("Heart floating");
  }, 300);
  
  // Step 3: Start white fade-in while heart is floating (1000ms)
  setTimeout(() => {
    overlay.classList.add('active');
    console.log("White overlay active");
  }, 1000);
  
  // Step 4: show screen 3
setTimeout(() => {

  switchScreen('screen3'); // now screen3 is visible

  // start suspense timer AFTER showing
  setTimeout(() => {
    switchScreen('screen4');
  }, 4000);

}, 2000);

  
  // Step 5: Fade out white to reveal Screen 3 (2500ms)
  setTimeout(() => {
    overlay.classList.remove('active');
    console.log("White overlay removed - Screen 3 visible");
  }, 2500);
  
  // Step 6: Final cleanup
  setTimeout(() => {
    heart.classList.remove('floating');
    transitionInProgress = false;
    console.log("Transition to Screen 3 complete - THE END!");
  }, 4000);
});


const yesBtn = document.getElementById('yesBtn');
const noBtn  = document.getElementById('noBtn');

const yesSfx = document.getElementById('yesSfx');
yesSfx.volume = 0.5;


const noSfx = document.getElementById('noSfx');
noSfx.volume = 0.5;

noBtn.addEventListener('click', (e) => {

  // 🔊 play sound FIRST
  noSfx.currentTime = 0;
  noSfx.play().catch(()=>{});

  const rect = noBtn.getBoundingClientRect();

  burstHearts(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2
  );

  noBtn.classList.add('explode');

  setTimeout(() => {
    noBtn.style.display = 'none';
  }, 600);
});


function spawnSparkle() {

  if (!yesBtn) return;

  const rect = yesBtn.getBoundingClientRect();

  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.innerHTML = '✨';

  const x = rect.left + Math.random() * rect.width;
  const y = rect.top + Math.random() * rect.height;

  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}

setInterval(spawnSparkle, 250);



function burstHearts(x, y) {

  const count = 25; // ⭐ number of hearts

  for (let i = 0; i < count; i++) {

    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '💖';

    // random direction
    const angle = Math.random() * 2 * Math.PI;
    const distance = 80 + Math.random() * 80;

    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    heart.style.setProperty('--dx', dx + 'px');
    heart.style.setProperty('--dy', dy + 'px');

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 900);
  }
}


function startConfetti() {

  const emojis = ['💖','✨','💕','🌸','💗','🪻'];

  setInterval(() => {

    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

    piece.style.left = Math.random() * window.innerWidth + 'px';
    piece.style.top  = '-30px';   // ⭐ spawn above screen


    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 3000);

  }, 120);
}

yesBtn.addEventListener('click', () => {

  // 🔊 play sound FIRST
  yesSfx.currentTime = 0;
  yesSfx.play().catch(()=>{});


  switchScreen('screen5');
  startConfetti();

});

