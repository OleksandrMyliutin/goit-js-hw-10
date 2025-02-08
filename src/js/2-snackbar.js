import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");


form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault(); 


  const delay = parseInt(form.querySelector('input[name="delay"]').value);
  const state = form.querySelector('input[name="state"]:checked')?.value; 


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

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

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
