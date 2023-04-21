const form = document.querySelector("#payment-form");
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
const address = document.querySelector("#address");
const addressError = document.querySelector("#addressError");
const city = document.querySelector("#city");
const cityError = document.querySelector("#cityError");
const phone = document.querySelector("#phone");
const phoneError = document.querySelector("#phoneError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const cardNumber = document.querySelector("#card-number");
const cardNumberError = document.querySelector("#cardNumberError");
const cvc = document.querySelector("#cvc");
const cvcError = document.querySelector("#cvcError");
const expiry = document.querySelector("#expiry");
const expiryError = document.querySelector("#expiryError");
const successMessage = document.querySelector("#successMessage");

form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();

  let formValid = true;

  if (checkLength(firstName.value, 0) === true) {
    firstNameError.style.display = "none";
  } else {
    firstNameError.style.display = "block";
    formValid = false;
  }

  if (checkLength(address.value, 0) === true) {
    addressError.style.display = "none";
  } else {
    addressError.style.display = "block";
    formValid = false;
  }

  if (checkLength(city.value, 0) === true) {
    cityError.style.display = "none";
  } else {
    cityError.style.display = "block";
    formValid = false;
  }

  if (validatePhone(phone.value) === true) {
    phoneError.style.display = "none";
  } else {
    phoneError.style.display = "block";
    formValid = false;
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
    formValid = false;
  }

  if (checkCardNumber(cardNumber.value) === true) {
    cardNumberError.style.display = "none";
  } else {
    cardNumberError.style.display = "block";
    formValid = false;
  }

  if (checkCVC(cvc.value) === true) {
    cvcError.style.display = "none";
  } else {
    cvcError.style.display = "block";
    formValid = false;
  }

  if (checkExpiry(expiry.value) === true) {
    expiryError.style.display = "none";
  } else {
    expiryError.style.display = "block";
    formValid = false;
  }

  if (formValid) {
    successMessage.style.display = "block";
    form.reset();
  }
}

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validatePhone(phone) {
  const regEx = /^\d{8,}$/;
  const patternMatches = regEx.test(phone);
  return patternMatches;
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

function checkCardNumber(cardNumber) {
  const regEx = /^[0-9]{16}$/;
  const patternMatches = regEx.test(cardNumber);
  return patternMatches;
}

function checkCVC(cvc) {
  const regEx = /^[0-9]{3}$/;
  const patternMatches = regEx.test(cvc);
  return patternMatches;
}

function checkExpiry(expiry) {
  const regEx = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  const patternMatches = regEx.test(expiry);
  return patternMatches;
}


