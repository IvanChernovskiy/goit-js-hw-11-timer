class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerContent = document.querySelector(this.selector);
    this.refs = {
      days: this.timerContent.querySelector('span[data-value="days"]'),
      hours: this.timerContent.querySelector('span[data-value="hours"]'),
      mins: this.timerContent.querySelector('span[data-value="mins"]'),
      secs: this.timerContent.querySelector('span[data-value="secs"]')
    };
  }

  startTimerDown() {
    this.timerID = setInterval(() => {
      const currnetTime = Date.now();
      this.deltaTime = this.targetDate - currnetTime;
      this.updateTimerContent(this.deltaTime);
      if (this.deltaTime < 0) {
        this.stopTimerDown();
      }
    }, 1000);
  }

  stopTimerDown() {
    clearInterval(this.timerID);
    this.deltaTime = 0;
    this.updateTimerContent(this.deltaTime);
  }

  updateTimerContent(time) {
    this.refs.days.textContent = this.pad(
      Math.floor(time / (1000 * 60 * 60 * 24))
    );
    this.refs.hours.textContent = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    this.refs.mins.textContent = this.pad(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    );
    this.refs.secs.textContent = this.pad(
      Math.floor((time % (1000 * 60)) / 1000)
    );
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("march 8, 2020")
});
timer.startTimerDown();
