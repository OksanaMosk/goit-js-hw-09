import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handlerSubmit);
function handlerSubmit(e) {
  e.preventDefault();
  let delay = Number(formEl.delay.value);
  for (let i = 1; i <= formEl.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += Number(formEl.step.value);
  }
}
function createPromise(position, delay) {
  const promiseEl = { position, delay };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(promiseEl);
      } else {
        // Reject
        reject(promiseEl);
      }
    }, delay);
  });
}
