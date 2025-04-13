const inputDisplay = document.querySelector("input")
const buttons = document.querySelectorAll('.btn');

let firstNumber = ""
let secondNumber = ""
let currentOperator = ""
let result = null
let isSecondNumber = false
let hasDecimal = false
let digitCount = 0
const maxDigits = 10

function updateDisplay(value) {
    inputDisplay.value = value    
}

function handleDigitInput(digit){
    // prevent input if digit count reaches 10
    if(digitCount >=  maxDigits) return

    // decide whether we're inputting first or second number
    if(!isSecondNumber){
        firstNumber += digit
        updateDisplay(firstNumber);
    }else{
        secondNumber += digit
        updateDisplay(secondNumber)
    }
    digitCount++
}

function handleDecimal() {
    if(hasDecimal) return

    // if nothing typed yet, start with "0."
    if((!isSecondNumber && firstNumber === "") || (isSecondNumber && secondNumber === "")){
        handleDigitInput("0")
    }

    if(!isSecondNumber){
        firstNumber += "."
        updateDisplay(firstNumber)
    }else {
        secondNumber += "."
        updateDisplay(secondNumber)
    }
    hasDecimal = true
}

function handleOperatorInput(operator){
    if(inputDisplay.value === ""){
        firstNumber = "0"; //default value if nothing typed yet
        updateDisplay(firstNumber)
    }

    if(!isSecondNumber) {
        currentOperator = operator;
        isSecondNumber = true;
        hasDecimal = false;
        digitCount = 0
    }
}

function handleToggleSign() {
    if (!isSecondNumber){
        firstNumber = toggleSign(firstNumber);
        updateDisplay(firstNumber);
    }else {
        secondNumber = toggleSign(secondNumber)
        updateDisplay(secondNumber)
    }
}

function toggleSign(numStr) {
    if(numStr.startsWith("-")){
        return numStr.slice(1);
    }else if (numStr.lenght > 0){
        return "-" + numStr
    }
    return numStr   
}

function handleClearAll(){
    firstNumber = ""
    secondNumber = ""
    currentOperator = ""
    result = null
    isSecondNumber = false
    hasDecimal = false
    digitCount = 0
    updateDisplay("")
}

function handleClearEntry() {
    if(!isSecondNumber){
        firstNumber = firstNumber.slice(0, -1)
        updateDisplay(firstNumber)
        digitCount--
    }else {
        secondNumber = secondNumber.slice(0, -1)
        updateDisplay(secondNumber)
        digitCount--
    }
}
 
function handleEquals() {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
  
    if (currentOperator === "/" && num2 === 0) {
      updateDisplay("Can't divide by 0");
      return;
    }
  
    switch (currentOperator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      case "%":
        result = num1 % num2;
        break;
      default:
        return;
    }
  
    // For future extension: show full expression and result visually (e.g. move expression slightly up)
    updateDisplay(result);
  
    // Prepare for next operation
    firstNumber = result.toString();
    secondNumber = "";
    isSecondNumber = false;
    currentOperator = "";
    result = null;
    hasDecimal = firstNumber.includes(".");
    digitCount = firstNumber.replace(".", "").length;
  }
  
    

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;

        if (action === 'digit') {
            handleDigitInput(e.target.textContent); // Handle digit inputs
        } else if (action === 'decimal') {
            handleDecimal(); // Handle decimal input
        } else if (action === 'operator') {
            const operator = e.target.dataset.operator;
            handleOperatorInput(operator); // Handle operator input
        } else if (action === 'clear-entry') {
            handleClearEntry(); // Handle CE (Clear Entry)
        } else if (action === 'clear-all') {
            handleClearAll(); // Handle C (Clear All)
        } else if (action === 'toggle-sign') {
            handleToggleSign(); // Handle toggle sign
        } else if (action === 'equals') {
            handleEquals(); // Handle equals button to calculate result
        }
    });
});
















































// // const displayInput = document.querySelector("input")
// // const btns = document.querySelectorAll(".btn")

// let firstOperand = ""
// let secondOperand = ""
// let  operator = ""
// let isSecondOperand = false
// let currentInput = ""
// let isDecimalUsed = false
// let digitCount = 0

// const handleNumberInput = (digit) => {
//     // Decide which operand to update
//     if (!isSecondOperand){
//         // first operand logic
//         if (firstOperand.length >= 10) return // block if over 10 digits
//         firstOperand += digit
//         updateDisplay(firstOperand)
//     }else{
//         // second operand logic
//         if (secondOperand.length >= 10) return; // block if over 10 digits
//         secondOperand += digit
//         updateDisplay(`${firstOperand} ${operator} ${secondOperand}`);
//     }
// }

// const handleOperatorInput = (op) => {
//     if (operator) return //prevent mulitple operator like ++ or */
//     if (firstOperand === ""){
//         firstOperand = "0"; //if user start with operator
//     }

//     operator = op
//     isSecondOperand = true

//     updateDisplay(`${firstOperand} ${operator}`)
// }

// const handleDecimal = () => {

// }