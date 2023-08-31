import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');

const timerValue = {
  startBtn: document.querySelector('button[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),

  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

timerValue.startBtn.style.backgroundColor = '#95F160';
timerValue.startBtn.style.borderRadius = '50%';
timerValue.startBtn.style.height = '100px';
timerValue.startBtn.style.width = '100px';
timerValue.startBtn.style.color = '#000000';

timerValue.days.style.color = '#95F160';
timerValue.hours.style.color = '#95F160';
timerValue.minutes.style.color = '#95F160';
timerValue.seconds.style.color = '#95F160';

timerValue.inputEl.style.backgroundColor = '#95F160';
timerValue.inputEl.style.borderRadius = '50%';
timerValue.inputEl.style.height = '75px';
timerValue.inputEl.style.width = '150px';
timerValue.inputEl.style.textAlign = 'center';
timer.style.textAlign = 'center';
timer.style.textAlign = 'center';
timer.style.fontSize = '36px';

timerValue.startBtn.disabled = true;
let count = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      timerValue.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future.');
      return;
    }

    if (selectedDates[0] > new Date()) {
      timerValue.startBtn.disabled = false;
    }

    const handlerclick = () => {
      clearInterval(count);
      count = setInterval(() => {
        const numberTime = selectedDates[0] - new Date();

        if (numberTime < 999) {
          clearInterval(count);
          Notiflix.Notify.success('Homework is already accepted. 😉 ', {
            timeout: 2000,
          });
        }

        const result = convertMs(numberTime);
        onTimer(result);
      }, 1000);
    };

    timerValue.startBtn.addEventListener('click', handlerclick);
  },
};

flatpickr('#datetime-picker', options);

function onTimer({ days, hours, minutes, seconds }) {
  timerValue.days.textContent = `${days}`;
  timerValue.hours.textContent = `${hours}`;
  timerValue.minutes.textContent = `${minutes}`;
  timerValue.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));

  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
