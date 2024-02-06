const timer = document.querySelector("[data-timer]");
const play = document.querySelector("[data-play]");
const pause = document.querySelector("[data-pause]");

var playing = false;
timer.addEventListener("submit", (event) => {
  event.preventDefault();
  const hour = document.querySelector("[data-hour]");
  const minute = document.querySelector("[data-minute]");
  const second = document.querySelector("[data-second]");
  if (hour.value === "") {
    hour.value = "00";
  }
  if (minute.value === "") {
    minute.value = "00";
  }
  if (second.value === "") {
    second.value = "00";
  }
  var counter =
    parseInt(hour.value) * 3600 +
    parseInt(minute.value) * 60 +
    parseInt(second.value);

  if (playing === false) {
    playing = !playing;
    play.style.display = "none";
    pause.style.display = "block";

    interval = setInterval(() => {
      start(--counter);
      if (counter === 0) {
        clearInterval(interval);
        play.style.display = "block";
        pause.style.display = "none";
      }
    }, 1000);
  } else {
    clearInterval(interval);
    playing = !playing;
    play.style.display = "block";
    pause.style.display = "none";
  }
});

timer.addEventListener("reset", () => {
  clearInterval(interval);
  play.style.display = "block";
  pause.style.display = "none";
});

function start(counter) {
  const hour = document.querySelector("[data-hour]");
  const minute = document.querySelector("[data-minute]");
  const second = document.querySelector("[data-second]");

  hour.value =
    (Math.floor(counter / 3600) < 10 ? "0" : "") + Math.floor(counter / 3600);
  minute.value =
    (Math.floor((counter - hour.value * 3600) / 60) < 10 ? "0" : "") +
    Math.floor((counter - hour.value * 3600) / 60);
  second.value =
    (counter - hour.value * 3600 - minute.value * 60 < 10 ? "0" : "") +
    (counter - hour.value * 3600 - minute.value * 60);
}

const inputs = document.querySelectorAll('input[type="number"]');

inputs.forEach((input) => {
  input.addEventListener("wheel", function (event) {
    if (playing === true) {
      event.preventDefault();
    } else {
      event.preventDefault();

      if (event.deltaY > 0) {
        if (parseInt(input.value) < parseInt(input.getAttribute("max"))) {
          input.value = (input.value++ < 9 ? "0" : "") + input.value++;
        }
        if (parseInt(input.value) === parseInt(input.getAttribute("max"))) {
          input.value = "0" + parseInt(input.getAttribute("min"));
        }
      } else {
        if (parseInt(input.value) > parseInt(input.getAttribute("min"))) {
          input.value = (input.value-- < 10 ? "0" : "") + input.value--;
        }
        if (parseInt(input.value) === parseInt(input.getAttribute("min"))) {
          input.value = parseInt(input.getAttribute("max"));
        }
      }
    }
  });
  input.addEventListener("keydown", function (event) {
    if (playing === true) {
      event.preventDefault();
    }
  });
});
