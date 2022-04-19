
let numBtns = document.getElementById("number-buttons");

numBtns.addEventListener("click", (e) => { // we're using event delegation
    if (e.target.tagName === "BUTTON") {
        console.log(e.target.textContent);
        document.getElementById("input.field").textContent += e.target.textContent;
    }
});