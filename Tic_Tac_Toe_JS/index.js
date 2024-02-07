const boxes = document.querySelectorAll(".box");
var playerName = document.querySelector(".player-name");
const restartButton = document.querySelector(".restart-button");

const winnigPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let gameGrid = ["", "", "", "", "", "", "", "", ""];
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  if (gameGrid[index] === "") {
    gameGrid[index] = playerName.innerText;
    boxes[index].innerText = playerName.innerText;
    boxes[index].style.pointerEvents = "none";
    changePlayer();
    checkEnd();
  }
}

function changePlayer() {
  playerName.innerText = playerName.innerText === "X" ? "O" : "X";
}

function checkEnd() {
  let winner = "";
  winnigPosition.forEach((position) => {
    if (
      gameGrid[position[0]] != "" &&
      gameGrid[position[1]] != "" &&
      gameGrid[position[2]] != "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[2]] === gameGrid[position[1]]
    ) {
      winner = gameGrid[position[0]];
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      restartButton.style.display = "block";
      boxes[position[0]].classList.add("active");
      boxes[position[1]].classList.add("active");
      boxes[position[2]].classList.add("active");
    }
  });

  if(winner !=""){
    setTimeout(()=>{

      alert("Player " + winner + " wins!");
    },100)
  }
  let allBoxesfilled = true;
  gameGrid.forEach((pos) => {
    if(pos==""){
      allBoxesfilled = false;
    }
  })

  if(allBoxesfilled ==true){
    setTimeout(()=>{

      alert("Draw!");
    },100)
    restartButton.style.display = "block";
  } 

}

restartButton.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "auto";
    box.classList.remove("active");
  });
  restartButton.style.display = "none";
  gameGrid = ["", "", "", "", "", "", "", "", ""]
});
