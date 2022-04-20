let displayMax = 12; // the max number of characters we will display on the calculator screen 
let inOrOut = "in"; // indicates whether input field is displaying an input or an output 

/* PURPOSE OF inOrOut
important, since if it is input then pressing a number button will continue the input, 
while if it is output then pressing number button should wipe the current output and replace with entered number
*/

function inputNumber(e) {
    if (e.target.tagName !== "BUTTON") return;

    let inputField = document.getElementById("input-field");

    if (inOrOut === "in") {
        if (inputField.textContent.length >= displayMax) return;

        if (inputField.textContent === "0") {
            if (e.target.textContent === "0") return;
            inputField.textContent = e.target.textContent;
        } else {
            inputField.textContent += e.target.textContent;
        }
    } else {
        inputField.textContent = e.target.textContent;
        inOrOut = "in";
    }
}

let numBtns = document.getElementById("number-buttons");
numBtns.addEventListener("click", inputNumber);

function calcResult(a, b, operator) {
    // accepts a and b as strings, and returns a string
    // if result has too many digits, but no decimal returns "TOO HIGH/LOW"
    // if result has too many digits and decimals, truncates (doesn't round!)
    let result;
    a = +a;
    b = +b;
    switch (operator) {
        case "+":
            result = a+b;
            break;
        case "-":
            result = a-b;
            break;
        case "×":
            result = a*b;
            break;
        case "÷":
            if (!b) {
                inOrOut = "out";
                return "NICE TRY";
            }
            result = a/b;
            break;
    }
    result = result.toLocaleString('fullwide', { useGrouping: false }); // instead of toString(), to prevent scientific notation
    if (result.length > displayMax) {
        if (result.includes(".")) // actually, there might be a problem here if we truncate everything after the decimal point, but not the point
            return result.substring(0, displayMax);
        else {
            inOrOut = "out";
            return "TOO HIGH/LOW";
        }
    }
    return result;
}
function getDownButton() {
    let operationBtns = document.getElementById("operation-buttons").children;
    for (o of operationBtns)
        if (o.classList.contains("down"))
            return o;
}

function prepareOperation(e) {
    // if it is an error string, then leave it there
    if (isNaN(Number(document.getElementById("input-field").textContent))) 
        return;

    /* we have this in prepareOperation so that if the result of an operation is an error string (the operation may
    have been run when we press =, in which case we would already have the string in the input-field, or when we press
    an operation button, in which case the executeOperation() that ran right before would put it in the input-field),
    we don't try and move the error string to prev-result and let the user do a calculation with it */

    document.getElementById("prev-result").textContent = document.getElementById("input-field").textContent;

    e.target.classList.add("down");
    
    inOrOut = "in"; // it might have been out previously (e.g., if the previous press was "="), so reset to in
    document.getElementById("input-field").textContent = "0";
}
function executeOperation() {
    // if it is an error string, then leave it there
    if (isNaN(Number(document.getElementById("input-field").textContent))) 
        return;
    
    /* we have this in executeOperation so that pressing "=" on an error string won't try to do anything */

    let prevResult = document.getElementById("prev-result");
    let currInput = document.getElementById("input-field");
    let currOperation = getDownButton();

    currInput.textContent = calcResult(prevResult.textContent, currInput.textContent, currOperation.textContent);
    prevResult.textContent = "";
    currOperation.classList.remove("down");
    inOrOut = "out";
}


let operationBtns = document.getElementById("operation-buttons");
let equalBtn = document.getElementById("equals-button");

operationBtns.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    if (document.getElementById("prev-result").textContent) {
        executeOperation();
        prepareOperation(e)
    } else {
        prepareOperation(e);
    }
});
equalBtn.addEventListener("click", () => { 
    if (document.getElementById("prev-result").textContent) executeOperation();
});


function resetCalculator() {
    document.getElementById("prev-result").textContent = "";
    document.getElementById("input-field").textContent = "0";
    let downBtn = getDownButton();
    if (downBtn) downBtn.classList.remove("down");
}
document.getElementById("clear-button").addEventListener("click", resetCalculator);