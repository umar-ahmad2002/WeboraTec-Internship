const form = document.getElementById("contactForm");
const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  message: document.getElementById("message")
};
const errors = {
  name: document.getElementById("nameError"),
  email: document.getElementById("emailError"),
  message: document.getElementById("messageError")
};
const successMessage = document.getElementById("successMessage");

function showError(field, message) {
  errors[field].textContent = message;
  fields[field].classList.toggle("invalid", Boolean(message));
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  successMessage.hidden = true;

  const name = fields.name.value.trim();
  const email = fields.email.value.trim();
  const message = fields.message.value.trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  showError("name", name ? "" : "Please enter your name.");
  showError("email", !email ? "Please enter your email address." : (!emailIsValid ? "Please enter a valid email address." : ""));
  showError("message", message ? "" : "Please enter a message.");

  if (name && emailIsValid && message) {
    successMessage.hidden = false;
    form.reset();
    successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

Object.keys(fields).forEach(function (key) {
  fields[key].addEventListener("input", function () {
    if (errors[key].textContent) showError(key, "");
  });
});