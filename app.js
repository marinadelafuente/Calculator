const buttonsContainer = document.querySelector(".grid-buttons");
const operationButtons = document.querySelectorAll("[data-action]");
const output = document.querySelector(".output");

let prevButton = "";
let operationsButton = "";
let prevValue;

const handleClick = (ev) => {
  const buttonDataset = ev.target.dataset;
  let outputValue = output.innerHTML;

  // Remove a css class
  const removePressed = () => {
    operationButtons.forEach((button) => button.classList.remove("is-pressed"));
  };

  // Reset to initial values
  const resetValues = () => {
    prevButton = "";
    operationsButton = "";
    prevValue = undefined;
    output.innerHTML = 0;
  };

  // Make calculations
  const calculateResult = (prevValue, operation, secondValue) => {
    switch (operation) {
      case "multiply":
        return prevValue * secondValue;
      case "minus":
        return prevValue - secondValue;
      case "division":
        return prevValue / secondValue;
      default:
        return Number(prevValue) + Number(secondValue);
    }
  };
  // Add number
  if (buttonDataset.number) {
    // Replace current output
    if (outputValue === "0" || prevButton === "operator") {
      output.innerHTML = buttonDataset.number;
    }
    // Add number to the current output
    else {
      output.innerHTML += buttonDataset.number;
    }
    prevButton = "number";
  }
  // Add a decimal
  else if (buttonDataset.action === "decimal") {
    output.innerHTML += ".";
  }
  // Calculate the percentage
  else if (buttonDataset.action === "percentage") {
    output.innerHTML = outputValue / 100;
  }
  // Change the number to negative or positive
  else if (buttonDataset.action === "type") {
    if (outputValue.includes("-")) {
      outputValue = outputValue.slice(1);
    } else {
      outputValue = `-${outputValue}`;
    }
    output.innerHTML = outputValue;
  }
  // Clear the output
  else if (buttonDataset.action === "reset") {
    resetValues();
    removePressed();
  }
  // Calculate the result
  else if (buttonDataset.action === "equal") {
    output.innerHTML = calculateResult(prevValue, operationsButton, outputValue);
    prevButton = "operator";
    removePressed();
    prevValue = outputValue;
  }
  // Make the operations
  else {
    removePressed();
    console.log("ev.target.value", ev);
    if (!ev.target.classList.contains("grid-buttons")) ev.target.classList.add("is-pressed");
    if (prevValue && prevValue !== outputValue && prevButton === "number") {
      output.innerHTML = calculateResult(prevValue, operationsButton, outputValue);
    }
    prevButton = "operator";
    prevValue = output.innerHTML;
    operationsButton = buttonDataset.action;
  }
};

buttonsContainer.addEventListener("click", handleClick);
