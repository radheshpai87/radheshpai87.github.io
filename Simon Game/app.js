let gameSeq = [];
let userSeq = [];
let btns = ["pink", "green", "orange", "blue"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(function () {
        userSeq = [];
        levelUp();
      }, 1000);
    }
  } else {
    h2.innerHTML = `Game Over, Your Score was <b>${level}</b>`;
    setTimeout(() => {
      reset();
    }, 1000);
  }
}
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function usrFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  level++;
  h2.innerText = `Level ${level}`;
  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameSeq.push(randomColor);
  console.log(gameSeq);
  btnFlash(randomBtn);
}

function btnPress() {
  let btn = this;
  usrFlash(btn)
  let usrColor = btn.id;
  userSeq.push(usrColor);
  console.log(userSeq);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  gameSeq = [];
  userSeq = [];
  started = false;
  level = 0;
  h2.innerText = "Press Any Key to Start";
}
