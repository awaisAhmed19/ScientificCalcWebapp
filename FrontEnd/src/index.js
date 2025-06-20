import Eval from "./Calc_Module/Evaluator.js";
const Evaluator = new Eval();
let exp_review = document.getElementById("calculatorDisplay");
let expression = document.getElementById("calculatorResult");

const buttonEl = document.querySelectorAll(".btnEl");
const clearButton = document.querySelector(".clearButton");
const clearDisplay = document.querySelector(".clearDisplay");
const backSpace = document.querySelector(".backSpace");
const calculate = document.querySelector(".calculate");
clearButton.addEventListener("click", (event) => {
  expression.textContent = "";
});
clearDisplay.addEventListener("click", (event) => {
  expression.textContent = "";
  exp_review.textContent = "";
});

backSpace.addEventListener("click", (event) => {
  expression.textContent = expression.textContent.substring(
    0,
    expression.textContent.length - 1,
  );
});

buttonEl.forEach((button) => {
  button.addEventListener("click", (event) => {
    expression.textContent += event.target.value;
  });
});

calculate.addEventListener("click", (event) => {
  let exp = expression.textContent.trim();
  if (exp !== "") {
    let result = Evaluator.evalulator(exp);
    exp_review.textContent = "";
    exp_review.innerHTML += exp;
    expression.textContent = "";
    expression.innerHTML += result;
  }
});
