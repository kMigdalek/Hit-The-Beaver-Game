document.addEventListener("DOMContentLoaded", function () {
  const newGame = document.querySelector(".main__button");
  const title = document.querySelector(".main__title");
  const main = document.querySelector(".main");
  const skip = document.querySelector(".skip");

  let intervalTime = 900;

  const musicPlay = () => {
    document.getElementById("mainMusic").play();
  };

  musicPlay();

  // ANIMATION START

  const startGame = () => {
    newGame.removeEventListener("click", startGame);
    setTimeout(() => {
      main.remove();
    }, 3000);
    newGame.classList.add("main__button-off");
    title.classList.add("main__title-off");
    setTimeout(() => {
      setInterval(addLetter, 50);
      setInterval(cursorAnimation, 400);
      skip.classList.add("active");
    }, 3000);
    document.getElementById("mainMusic").play();
  };

  newGame.addEventListener("click", startGame);

  // SKIP BUTTON
  skip.addEventListener("click", function () {
    deleteText();
    skip.classList.remove("active");
  });

  // TEXT BEFORE GAME

  const spanText = document.querySelector(".text__text");
  const spanCursor = document.querySelector(".text__cursor");
  const txt = [
    "The evil beaver is trying to destroy all the forests of the world. Don't let him do it. Hit him as many times as you can.",
    "Remember, the evil beaver is very smart, his movement skills will increase according to how many times you hit him. Try to reach the higher level and show him who is the master.",
    "Good luck !",
  ];

  let txtNumber = 0;
  let txtLetter = 0;

  const addLetter = () => {
    if (txtLetter >= txt[txtNumber].length) {
      txtLetter = -60;
      txtNumber++;
      if (txtNumber < txt.length) {
        setTimeout(() => {
          spanText.textContent = "";
        }, 2000);
      } else {
        for (let i = 1; i < 100; i++) {
          window.clearInterval(i);
        }
        spanCursor.classList.remove("active");
        setTimeout(deleteText, 2000);
        skip.classList.remove("active");
      }
    }
    if (txtLetter >= 0 && txtNumber < txt.length) {
      spanText.textContent += txt[txtNumber][txtLetter];
    }
    txtLetter++;
  };

  // CURSOR MECHANICS

  const cursorAnimation = () => {
    spanCursor.classList.toggle("active");
  };

  const timer = document.querySelector(".timer");

  // ADDLETTER FUNCTION REFERENCE
  const deleteText = () => {
    document.querySelector(".text").remove();
    timer.classList.add("active");
    skip.remove();
    setInterval(timerCounting, 1000);
  };

  // COUNTING ON THE BEGINNING
  const timeSpan = document.querySelector(".timer__counting");
  let timeToGame = 3;

  const timerCounting = () => {
    const timer = document.querySelector(".timer");
    const timeSpan = document.querySelector(".timer__counting");

    if (timeToGame > 0) {
      timeToGame--;
      timeSpan.textContent = timeToGame;
    } else {
      for (let i = 1; i < 100000; i++) {
        window.clearInterval(i);
      }

      timer.classList.remove("active");
      showStatistics();
      setInterval(showingPicture, intervalTime);
    }
  };

  // GAME STARTS

  const game = document.querySelector(".game");
  const gamePicture = document.querySelector(".gamePicture");

  const lifePoints = document.querySelector(".life-points__number");
  const level = document.querySelector(".level__number");
  const gamePoints = document.querySelector(".game-points__number");

  let lifePointsNumber = 10.5;
  let GamePointsNumber = 0;

  let lostLife = true;

  const showStatistics = () => {
    game.style.display = "block";
  };

  // THE PICTURE MOVEMENT MECHANIC
  const showingPicture = () => {
    const gamePicture = document.querySelector(".gamePicture");

    const lifePoints = document.querySelector(".life-points__number");

    gamePicture.classList.toggle("on");

    const gamePlaceHeight = document.querySelector(".gamePlace").clientHeight;
    const gamePlaceWidth =
      document.querySelector(".game__statistics").clientWidth;
    const gamePictureWidth = document.querySelector(".gamePicture").clientWidth;
    const gamePictureHeight =
      document.querySelector(".gamePicture").clientHeight;

    let pictureTop = Math.random() * gamePlaceHeight - gamePictureHeight;
    let pictureLeft = Math.random() * gamePlaceWidth - gamePictureWidth;

    if (pictureTop < 0) {
      gamePicture.style.top = pictureTop + gamePictureHeight + "px";
    } else gamePicture.style.top = pictureTop + "px";

    if (pictureLeft < 0) {
      gamePicture.style.left = pictureLeft + gamePictureWidth + "px";
    } else gamePicture.style.left = pictureLeft + "px";

    if (lostLife) {
      lifePointsNumber = lifePointsNumber - 0.5;
      let floorlifePointsNumber = Math.floor(lifePointsNumber);
      lifePoints.textContent = floorlifePointsNumber;
    }

    if (lifePointsNumber < 1) {
      for (let i = 1; i < 100000; i++) {
        window.clearInterval(i);
      }

      // LOSE AND RESTART GAME

      document.body.innerHTML +=
        '<div class="lose"><div class="lose__Text">YOU LOST</div><div class="lose__button">NEW GAME</div></div>';
      const replayGame = document.querySelector(".lose__button");
      const lose = document.querySelector(".lose");

      replayGame.addEventListener("click", function () {
        timeToGame = 3;
        document.querySelector(".timer__counting").textContent = timeToGame;
        document.querySelector(".timer").classList.add("active");
        lose.remove();

        document.getElementById("loseMusic").pause();
        document.getElementById("mainMusic").play();
        setInterval(timerCounting, 1000);
        lifePointsNumber = 10.5;
        GamePointsNumber = 0;
        document.querySelector(".game-points__number").textContent =
          GamePointsNumber;
        document.querySelector(".life-points__number").textContent =
          Math.floor(lifePointsNumber);
        document.querySelector(".level__number").textContent = "EASY";
        document.querySelector(".level__number").style.color = "white";
        intervalTime = 900;
        document.querySelector(".level-info__level").style.color = "#907a48";
      });
      document.getElementById("mainMusic").pause();
      document.getElementById("loseMusic").play();
    }

    gamePicture.addEventListener("click", pictureClick);
  };

  // THE PICTURE CLICK MECHANIC

  const pictureClick = () => {
    const gamePicture = document.querySelector(".gamePicture");
    const gamePoints = document.querySelector(".game-points__number");
    if (!document.getElementById("hitSound").paused) {
      document.getElementById("hitSound2").play();
    }

    document.getElementById("hitSound").play();

    for (let i = 1; i < 100000; i++) {
      window.clearInterval(i);
    }
    gamePicture.classList.remove("on");
    ++GamePointsNumber;
    gamePoints.textContent = GamePointsNumber;

    // GETTING POINTS AND LEVELS MECHANIC

    if (GamePointsNumber === 20) {
      document.querySelector(".level-info").classList.add("on");
      document.querySelector(".level-info__level").textContent = "MEDIUM";
      document.querySelector(".level__number").textContent = "MEDIUM";
      intervalTime = 800;
      setTimeout(levelChanger, 2000);
      setTimeout(() => {
        setInterval(showingPicture, intervalTime);
      }, 3000);
      lifePointsNumber += 0.5;
    } else if (GamePointsNumber === 40) {
      document.querySelector(".level-info").classList.add("on");
      document.querySelector(".level-info__level").textContent = "HARD";
      document.querySelector(".level__number").textContent = "HARD";
      intervalTime = 700;
      setTimeout(levelChanger, 2000);
      setTimeout(() => {
        setInterval(showingPicture, intervalTime);
      }, 3000);
      lifePointsNumber += 0.5;
    } else if (GamePointsNumber === 80) {
      document.querySelector(".level-info").classList.add("on");
      document.querySelector(".level-info__level").textContent = "LEGEND";
      document.querySelector(".level-info__level").style.color = "red";
      document.querySelector(".level__number").textContent = "LEGEND";
      document.querySelector(".level__number").style.color = "red";
      intervalTime = 500;
      setTimeout(levelChanger, 2000);
      setTimeout(() => {
        setInterval(showingPicture, intervalTime);
      }, 3000);
      lifePointsNumber += 0.5;
    } else {
      lostLife = false;
      showingPicture();
      lostLife = true;
      setInterval(showingPicture, intervalTime);
    }
  };

  const levelChanger = () => {
    document.querySelector(".level-info").classList.remove("on");
  };
});
