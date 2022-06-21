function divide(a, b){
    return Number(a) / Number(b);
}

function multiply(a, b){
    return Number(a) * Number(b);
}

function subtract(a, b){
    return Number(a) - Number(b);
}

function add(a, b){
    return Number(a) + Number(b);
}

let entry = [];
let value = "";

function calculate(entry){
    let res;

    switch (entry[1]){
        case "/":
            res = divide(entry[0], entry[2]);
            break;
        case "*":
            res = multiply(entry[0], entry[2]);
            break;
        case "-":
            res = subtract(entry[0], entry[2]);
            break;
        case "+":
            res = add(entry[0], entry[2]);
            break;
        default:
            res = entry[0];
    }
    return res;
}

const display = document.querySelector("#displayText");
const operatorUsed = document.querySelector("#operationText");

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => button.addEventListener("click", () => button.classList.add("clicked")));
buttons.forEach(button => button.addEventListener("transitionend", () => button.classList.remove("clicked")));

const numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click", () => {
    if (entry[1] === "="){
        entry = [];
    }
    value += number.textContent;
    display.textContent = value;
}));

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    entry = [];
    value = "";
    display.textContent = "---";
    operatorUsed.textContent = "Operation: "
});

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
    value = value.slice(0, value.length - 1);
    
    if (value.length === 0){
        display.textContent = "---";
    }
    else {
        display.textContent = value;
    }
    console.log(value);
});

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => operator.addEventListener("click", () => {
    operatorUsed.textContent = `Operation: ${operator.textContent}`;
    
    entry.push(value);

    if (entry.length === 3){
        let res = calculate(entry);
        entry = [];
        entry.push(res);
    }
    value = "";
    entry.push(operator.textContent);
}));

const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
    if(entry.length <= 2){
        display.textContent = entry[0];
    }
    else {
        display.textContent = calculate(entry);
        entry = entry.slice(0, entry.length - 1);
    }
});

