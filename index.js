const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");
const circle = document.querySelector("#circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let duration;
let wasPaused = false;
const timer = new Timer(durationInput, startButton, pauseButton, resetButton, {
  onStart(totalDuration) {
    if (!duration || wasPaused) duration = totalDuration;
  },
  onTick(timeRemaining, totalDuration) {
    circle.setAttribute("stroke-dashoffset", (perimeter * timeRemaining) / totalDuration - perimeter);
  },
  onReset(resetDuration) {
    wasPaused = true;
    duration = resetDuration;
    circle.setAttribute("stroke-dashoffset", 0);
  },
  onComplete() {
    alert("Timer completed");
  },
});
