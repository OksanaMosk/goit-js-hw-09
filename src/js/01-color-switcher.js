const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;
const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const clickHandler = (event) => {
 timerId = setInterval(() => {
   document.body.style.backgroundColor =
  getRandomHexColor();
 }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}
startBtn.disabled = false;
stopBtn.disabled = true;

startBtn.addEventListener('click', clickHandler);

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  return; 
});

