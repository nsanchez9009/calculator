//Math functions. Don't need to have these here, I just think it looks nicer.
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

//Array that will contain the operation.
let entry = [];
//Variable used to combine multiple digit inputs. For example, [1, 2, 3] would be [123].
let value = "";

//Calculate function.
function calculate(entry){
    //return value.
    let res;

    //entry will always contain a number (0) an operator (1) and another number (2).
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
            //If the second index is not an operator, return the first number.
            //This prevents a bug where pressing "=" a lot can add empty indexes in the array.
            res = entry[0];
    }
    return res;
}

//Get the display text div.
const display = document.querySelector("#displayText");
//Get the operation text div.
const operatorUsed = document.querySelector("#operationText");

//Get every button.
const buttons = document.querySelectorAll(".button");
//Add the clicked class to every button when clicked.
buttons.forEach(button => button.addEventListener("click", () => button.classList.add("clicked")));
//Remove the clicked class after the transition ends.
buttons.forEach(button => button.addEventListener("transitionend", () => button.classList.remove("clicked")));

//Get every number button.
const numbers = document.querySelectorAll(".number");
//Add a click event listener to each button.
numbers.forEach(number => number.addEventListener("click", () => {
    //If the last character is "=" reset the entry array.
    //This is done so that after a calculation is completed, you can begin another one without having to press clear.
    if (entry[1] === "="){
        entry = [];
    }

    //Add the number (which is a character) to the value string.
    value += number.textContent;
    //Display the number to the user on the calculators display.
    display.textContent = value;
}));

//Get the clear button.
const clearButton = document.querySelector("#clear");
//Add an event listener that resets every value (front and back end) when clicked.
clearButton.addEventListener("click", () => {
    entry = [];
    value = "";
    display.textContent = "---";
    operatorUsed.textContent = "Operation: "
});

//Get the delete button.
const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
    //Remove the last (most recent) character in the value string. 123 -> 12.
    value = value.slice(0, value.length - 1);
    
    //If you delete all numbers, reset the display.
    if (value.length === 0){
        display.textContent = "---";
    }
    //Re-display the new value.
    else {
        display.textContent = value;
    }
});

//Get the operator buttons.
const operators = document.querySelectorAll(".operator");
//Add a click event listener to each button.
operators.forEach(operator => operator.addEventListener("click", () => {
    //Display the operator used.
    operatorUsed.textContent = `Operation: ${operator.textContent}`;
    
    //Push the value string onto the entry array.
    //This is done when an operator is clicked so that a user can click multiple numbers and not have them be separated in the entry array.
    //The user can click the numbers 1, 2, and 3 and have it saved as [123] and not [1, 2, 3]
    entry.push(value);

    //This checks the length of the entry so that if the user clicks an operator after inputting an operation, including "=", it will calculate the previous operation before continuing.
    //This allows the user to make inputs like "12+3-4*5" without pressing "=" after every operation.
    //This also just makes "=" a button that just triggers this check and doesn't actually do anything other than that.
    if (entry.length === 3){
        //Calculate the entry.
        let res = calculate(entry);
        //Reset the entry array and push the calculated value back onto the array.
        entry = [];
        entry.push(res);
    }
    //Reset value and push the new operator onto the array with the last value (the solution to the previous operation).
    //[12, +, 5] ... * is clicked ... [17, *].
    value = "";
    entry.push(operator.textContent);
}));

//Get the equal button.
const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
    //If "=" is clicked too early, do nothing except display the first number.
    //Example, If a user enters "12=" it would just display 12 and do nothing.
    if(entry.length <= 2){
        display.textContent = entry[0];
    }
});

