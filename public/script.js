const signUpForm = document.querySelector("#sign-up-form");
const inputElems = signUpForm.querySelectorAll("input");

console.log("hi");

signUpForm.setAttribute("novalidate", "");

signUpForm.addEventListener("submit", (event) => {
  const allInputsValid = signUpForm.checkValidity();
  if (!allInputsValid) {
    event.preventDefault();
    //if form is not submitted, clear user input
    inputElems.forEach((input) => {
      input.value = "";
    });
  }
});

inputElems.forEach((input) => {
  input.setAttribute("aria-invalid", false);
  //when user type something web page remove error msg
  input.addEventListener("input", () => {
    input.setAttribute("aria-invalid", false);
    const errorId = input.id + "Error";
    const errorContainer = signUpForm.querySelector("#" + errorId);
    errorContainer.textContent = "";
  });

  input.addEventListener("invalid", () => {
    input.setAttribute("aria-invalid", true);
    const errorId = input.id + "Error";
    const errorContainer = signUpForm.querySelector("#" + errorId);
    //for user to see in html page.
    errorContainer.textContent = input.validationMessage;
    //for user to see in web browser console.
    console.log(input.validationMessage);
  });
});
