let displayMax = 12; // the max number of characters we will display on the calculator screen 

function inputNumber(e) {
    if (e.target.tagName !== "BUTTON") return;

    let inputField = document.getElementById("input-field");

    if (inputField.textContent.length >= 12) return;

    if (inputField.textContent === "0") {
        if (e.target.textContent === "0") return;
        inputField.textContent = e.target.textContent;
    } else {
        inputField.textContent += e.target.textContent;
    }
}

let numBtns = document.getElementById("number-buttons");
numBtns.addEventListener("click", inputNumber);

function calcResult(a, b, operator) {
    // accepts a and b as strings, and returns a string
    // if result is too big, returns "TOO BIG"
    // if result has too many decimals, truncates (doesn't round!)
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
            result = a/b;
            break;
    }
    result.toString();
    if (result.length > displayMax) {
        if (result.include(".")) 
            return result.substring(0, displayMax);
        else 
            return "TOO BIG";
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
    if (e.target.tagName !== "BUTTON") return;

    document.getElementById("prev-result").textContent = 
            document.getElementById("input-field").textContent;

    e.target.classList.add("down");

    document.getElementById("input-field").textContent = "0";
}
function executeOperation() {
    let prevResult = document.getElementById("prev-result");
    let currInput = document.getElementById("input-field");
    let currOperation = getDownButton();

    currInput.textContent = calcResult(prevResult.textContent, currInput.textContent, currOperation.textContent);
    prevResult.textContent = "";
    currOperation.classList.remove("down");
}

// TODO: round the number, div by 0

let operationBtns = document.getElementById("operation-buttons");
let equalBtn = document.getElementById("equals-button");

operationBtns.addEventListener("click", (e) => {
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
