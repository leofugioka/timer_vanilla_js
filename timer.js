class Timer {
  initialTime = null;

  constructor(durationInput, startButton, pauseButton, resetButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.resetButton = resetButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onReset = callbacks.onReset;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.resetButton.addEventListener("click", this.reset);
  }

  start = () => {
    if (this.initialTime === null || this.timeRemainingOnPause !== this.timeRemaining) this.initialTime = parseFloat(this.timeRemaining);
    if (this.onStart) this.onStart(this.initialTime);
    this.tick();
    this.interval = setInterval(this.tick, 10);
  };

  pause = () => {
    clearInterval(this.interval);
    this.timeRemainingOnPause = this.timeRemaining;
  };

  reset = () => {
    this.pause();
    this.timeRemaining = this.initialTime;
    if (this.onTick) this.onReset(this.timeRemaining);
  };

  tick = () => {
    if (this.timeRemaining > 0) {
      this.timeRemaining = this.timeRemaining - 0.01;
      if (this.onTick) this.onTick(this.timeRemaining, this.initialTime);
    } else {
      this.pause();
      this.timeRemaining = 0;
      if (this.onComplete) this.onComplete();
    }
  };

  get timeRemaining() {
    return this.durationInput.value;
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }

  get initialTime() {
    return this.initialTime;
  }

  set initialTime(time) {
    this.initialTime = time.toFixed(2);
  }
}
