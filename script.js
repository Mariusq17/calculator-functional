const display = document.querySelector('.display');
const digits = document.getElementsByClassName('number');
const multiply = document.getElementById('functionalMultiply');
const division = document.getElementById('functionalDivision');
const substraction = document.getElementById('functionalSubstration');
const addition = document.getElementById('functionalAddition');
const dot = document.getElementById('functionalDot');
const equal = document.getElementById('functionalEqual');
const clearAllBtn = document.getElementById('clearAllBtn');
const clearBtn = document.getElementById('clearBtn');

let result, a, b;//tip string
let lastSign = '*';//tip string
let dotIsAdded = false, signIsAdded = false;

// Event Listener uri
for(let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    digit.addEventListener('click', () => {
        const elem = digit;
        const elemText = elem.firstChild.data;
        addDigit(elemText);
    });
}
equal.addEventListener("click", calculateAndDispaly);
dot.addEventListener('click', () => {
    const elemText = dot.firstChild.data;
    addDigit(elemText);
});
clearAllBtn.addEventListener('click', clearAll);
clearBtn.addEventListener('click', clear);
multiply.addEventListener('click', () => {
    updateSign(multiply);
});
addition.addEventListener('click', () => {
    updateSign(addition);
});
substraction.addEventListener('click', () => {
    updateSign(substraction);
});
division.addEventListener('click', () => {
    updateSign(division);
});

// Functii
function updateDisplay(x) {
    display.innerText += x;
}

function calculateAndDispaly() {
    let displayText = display.innerText, i = 0;
    const indexOfSign = displayText.indexOf(lastSign);
    lastSign = displayText[indexOfSign];
    a = Number(displayText.slice(0, indexOfSign));
    b = Number(displayText.slice(indexOfSign + 1));
    switch(lastSign) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '/':
            result = a / b;
            break;
        case '*':
            result = a * b;
            break;
        
    }
    if(result != null){
        display.innerText = '';
        dotIsAdded = false;
        signIsAdded = false;
        updateDisplay(result);
    }
}

// callback pentru addDigit
function isASign(x){
    return x == '/' || x == '*' || x == '+' || x == '-';
}
function addDigit(x) {
    const text = display.innerText;
    if(x == '.' && dotIsAdded === true) return;
    if(x == '.' && dotIsAdded === false) {
        if(text == '' || isNaN(text[text.length - 1]))
            updateDisplay('0');
        updateDisplay(x);
        dotIsAdded = true;
        return;
    }
    if((text.length == 1 && text[text.length - 1] == 0) ||
    (isASign(text[text.length - 2]) && text[text.length - 1] == 0))
        return;
    updateDisplay(x);
}

function updateSign(x) {
    const elemText = x.innerText;
    dotIsAdded = false;
    if(display.innerText.length > 0 && signIsAdded == false) {
        lastSign = elemText;
        signIsAdded = true;
        updateDisplay(lastSign);
    }
}

function clearAll() {
    display.innerText = '';
    a = b = result = lastSign = null;
    dotIsAdded = false;
}

function clear() {
    if(display.innerText.length > 0){
        if(display.innerText[display.innerText.length - 1] == '.') {
            dotIsAdded = false;
        }if(isASign(display.innerText[display.innerText.length - 1])) {
            signIsAdded = false;
        }
        const newDisplay = display.innerText.slice(0, -1);
        display.innerText = '';
        updateDisplay(newDisplay);
    }
}
