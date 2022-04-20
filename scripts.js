
let numBtns = document.getElementById("number-buttons");

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

numBtns.addEventListener("click", inputNumber);