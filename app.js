const buttonsContainer = document.querySelector(".grid-buttons");
const operationButtons = document.querySelectorAll("[data-action]");
const output = document.querySelector(".output");
const loader = document.querySelector(".loader");
const loader2 = document.querySelector(".loader2");

let prevButton = "";
let operationsButton = "";
let prevValue;

function handleClick(ev) {
  const buttonDataset = ev.target.dataset;
  let outputValue = output.textContent;

  // Remove a css class
  const removePressed = () => {
    operationButtons.forEach((button) => button.classList.remove("is-pressed"));
  };

  // Reset to initial values
  const resetValues = () => {
    prevButton = "";
    operationsButton = "";
    prevValue = undefined;
    output.textContent = 0;
  };

  // Make calculations
  // Use decimal.js to fix the JS issue of floating point numbers so that 0.1 + 0.2 = 0.3 instead of 0.30000000000000004
  const calculateResult = (prevValue, operation, secondValue) => {
    switch (operation) {
      case "multiply":
        return new Decimal(prevValue).times(secondValue);
      case "minus":
        return new Decimal(prevValue).minus(secondValue);
      case "division":
        return new Decimal(prevValue).div(secondValue);
      default:
        return new Decimal(prevValue).plus(secondValue);
    }
  };
  // Add number
  if (buttonDataset.number) {
    // Replace current output
    if (outputValue === "0" || prevButton === "operator") {
      output.textContent = buttonDataset.number;
    }
    // Add number to the current output
    else {
      output.textContent += buttonDataset.number;
    }
    prevButton = "number";
  }
  // Add a decimal
  else if (buttonDataset.action === "decimal") {
    output.textContent += ".";
  }
  // Calculate the percentage
  else if (buttonDataset.action === "percentage") {
    output.textContent = outputValue / 100;
  }
  // Change the number to negative or positive
  else if (buttonDataset.action === "type") {
    if (outputValue.includes("-")) {
      outputValue = outputValue.slice(1);
    } else {
      outputValue = `-${outputValue}`;
    }
    output.textContent = outputValue;
  }
  // Clear the output
  else if (buttonDataset.action === "reset") {
    resetValues();
    removePressed();
  }
  // Calculate the result
  else if (buttonDataset.action === "equal") {
    let result = calculateResult(prevValue, operationsButton, outputValue);
    output.textContent = result;
    prevButton = "operator";
    removePressed();
    prevValue = outputValue;
  }
  // Make the operations
  else {
    removePressed();
    if (!ev.target.classList.contains("grid-buttons")) ev.target.classList.add("is-pressed");
    if (prevValue && prevValue !== outputValue && prevButton === "number") {
      output.textContent = calculateResult(prevValue, operationsButton, outputValue);
    }
    prevButton = "operator";
    prevValue = output.textContent;
    operationsButton = buttonDataset.action;
  }
}

buttonsContainer.addEventListener("click", handleClick);
