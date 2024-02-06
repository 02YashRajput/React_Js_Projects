const boxes = document.querySelectorAll(".box");
var playerName = document.querySelector(".player-name");
const restartButton = document.querySelector(".restart-button");
boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    event.target.innerText = playerName.innerText;
    event.target.style.pointerEvents = "none";
    changePlayer();
    checkEnd();
  });
});

function changePlayer() {
  playerName.innerText = playerName.innerText === "X" ? "O" : "X";
}

function checkEnd() {
  let filledBoxCount = 0;
  boxes.forEach((box) => {
    if (box.innerText !== "") {
      filledBoxCount++;
    }
  });

  if (filledBoxCount === boxes.length) {
    restartButton.style.display = "block";
  }
}

restartButton.addEventListener("click", () => {
    boxes.forEach((box) => {
       box.innerText =""
       box.style.pointerEvents = "auto";    
    })
    restartButton.style.display = "none"
})
