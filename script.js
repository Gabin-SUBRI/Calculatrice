const buttons = document.querySelectorAll(".calculator-buttons button");
const display = document.querySelector(".calculator-display");
let currentInput = "";
let equation = "";
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if ((buttonText >= "0" && buttonText <= "9") || buttonText === ".") {
      currentInput += buttonText;
      display.value = equation + currentInput;
    } else if (buttonText === "C") {
      currentInput = "";
      equation = "";
      operator = "";
      display.value = "";
    } else if (buttonText === "CE") {
      currentInput = "";
      display.value = equation;
    } else if (buttonText === "←") {
      currentInput = currentInput.slice(0, -1);
      display.value = equation + currentInput;
    } else if (buttonText === "%") {
      currentInput = (parseFloat(currentInput) / 100).toString();
      display.value = equation + currentInput;
    } else if (buttonText === "=") {
      equation += currentInput;
      currentInput = evaluateEquation(equation).toString();
      display.value = currentInput;
      equation = "";
    } else {
      equation += currentInput + buttonText;
      display.value = equation;
      currentInput = "";
    }
  });
});

function evaluateEquation(equation) {
  // Evaluate the equation respecting the order of operations
  return Function('"use strict"; return (' + equation + ")")();
}
