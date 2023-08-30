import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');

startBtn.disabled = true;

flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
});
const currentDate = new Date();

function currentDifferenceDate(selectedDates) {
  if (selectedDates - currentDate <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future.', {
      timeout: 2000,
    });
  } else if (selectedDates > currentDate) {
    startBtn.disabled = false;
    let ms = selectedDates - currentDate;
  }
}

const timerValue = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;

const clickHandler = event => {
  setTimeout(() => {
    let ms = allms;
    timerId -= 1;
    function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = Math.floor(ms / day);
      console.log(days);
      // Remaining hours
      const hours = Math.floor((ms % day) / hour);
      // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
      // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      timerValue.days.textContent === days;
      timerValue.hours.textContent === hours;
      timerValue.minutes.textContent === minutes;
      timerValue.seconds.textContent === seconds;

      return { days, hours, minutes, seconds };
    }
  }, timerId * 1000);
};

startBtn.addEventListener('click', clickHandler);
