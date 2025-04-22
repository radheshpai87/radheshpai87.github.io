let gameSeq = [];
let userSeq = [];
let btns = ["pink", "green", "orange", "blue"];
let started = false;
let level = 0;
let highScore = localStorage.getItem('simonHighScore') || 0;

let h2 = document.querySelector("h2");
updateScoreDisplay();

function updateScoreDisplay() {
  if (started) {
    h2.innerHTML = `Level ${level} | High Score: ${highScore}`;
  } else {
    h2.innerHTML = `High Score: ${highScore} - Press Any Key to Start`;
  }
}

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    playSound("startSound");
    setTimeout(() => {
      levelUp();
    }, 2750);
  }
});

function playSound(id) {
  const allSounds = ['buttonSound', 'wrongSound', 'completeSound', 'startSound'];
  allSounds.forEach(soundId => {
    const sound = document.getElementById(soundId);
    sound.pause();
    sound.currentTime = 0;
  });

  const sound = document.getElementById(id);
  if (sound) {
    sound.play().catch(error => console.log("Sound play failed:", error));
  }
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(function () {
        userSeq = [];
        levelUp();
      }, 1000);
    }
  } else {
    playSound("wrongSound");
    if (level > highScore) {
      highScore = level;
      localStorage.setItem('simonHighScore', highScore);
    }
    h2.innerHTML = `Game Over! Score: ${level} - High Score: ${highScore}<br>Press any key to restart`;
    started = false;
    userSeq = [];
    setTimeout(function () {
      reset();
    }, 2000);
  }
}

function btnFlash(btn) {
  return new Promise(resolve => {
    btn.classList.add("flash");
    playSound("buttonSound");

    setTimeout(function () {
      btn.classList.remove("flash");
      setTimeout(resolve, 150);
    }, 300);
  });
}

async function flashSequence() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => btn.style.pointerEvents = 'none');

  await new Promise(resolve => setTimeout(resolve, 300));

  for (let i = 0; i < gameSeq.length; i++) {
    let color = gameSeq[i];
    let btn = document.querySelector(`.${color}`);
    await btnFlash(btn);
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  buttons.forEach(btn => btn.style.pointerEvents = 'auto');
}

function levelUp() {
  level++;
  updateScoreDisplay();
  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameSeq.push(randomColor);
  flashSequence();
}

function usrFlash(btn) {
  btn.classList.add("userFlash");
  playSound("buttonSound");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

function btnPress() {
  if (!started) return;

  let btn = this;
  usrFlash(btn);
  let usrColor = btn.id;
  userSeq.push(usrColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  gameSeq = [];
  userSeq = [];
  started = false;
  level = 0;
  updateScoreDisplay();
}