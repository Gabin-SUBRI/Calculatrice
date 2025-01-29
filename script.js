const buttons = document.querySelectorAll(".calculator-buttons button");
const display = document.querySelector(".calculator-display");
let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if ((buttonText >= "0" && buttonText <= "9") || buttonText === ".") {
      currentInput += buttonText;
      display.value = currentInput;
    } else if (buttonText === "C") {
      currentInput = "";
      previousInput = "";
      operator = "";
      display.value = "";
    } else if (buttonText === "CE") {
      currentInput = "";
      display.value = "";
    } else if (buttonText === "←") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } else if (buttonText === "%") {
      currentInput = (parseFloat(currentInput) / 100).toString();
      display.value = currentInput;
    } else if (buttonText === "=") {
      if (operator && previousInput !== "") {
        currentInput = operate(
          parseFloat(previousInput),
          parseFloat(currentInput),
          operator
        ).toString();
        display.value = currentInput;
        previousInput = "";
        operator = "";
      }
    } else {
      if (currentInput === "") return;

      if (previousInput !== "") {
        previousInput = operate(
          parseFloat(previousInput),
          parseFloat(currentInput),
          operator
        ).toString();
      } else {
        previousInput = currentInput;
      }

      operator = buttonText;
      currentInput = "";
    }
  });
});

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return num2;
  }
}
