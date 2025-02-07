// Імпортуємо iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Знаходимо форму
const form = document.querySelector(".form");

// Додаємо обробник події
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки

  // Отримуємо значення затримки та стану
  const delay = parseInt(form.querySelector('input[name="delay"]').value);
  const state = form.querySelector('input[name="state"]:checked')?.value; // Перевіряємо, чи обраний стан

  // Валідуємо введені дані
  if (isNaN(delay) || delay <= 0) {
    iziToast.error({
      title: "Warning",
      message: "Please enter a valid delay (greater than 0)",
      position: "topRight",
    });
    return;
  }

  if (!state) {
    iziToast.error({
      title: "Warning",
      message: "Please select a state (fulfilled or rejected)",
      position: "topRight",
    });
    return;
  }

  // Створюємо проміс
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обробляємо результат промісу
  promise
    .then((delay) => {
      iziToast.success({
        title: "Success",
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: "Error",
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });
    });
}
