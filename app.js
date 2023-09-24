var screen = document.querySelector('.calculator_screen'),
    numBtns = document.querySelectorAll('.num'),
    operatorBtns = document.querySelectorAll('.operatorBtn'),
    equalBtn = document.querySelector('.equalBtn'),
    allClearBtn = document.querySelector('.allClear'),
    deleteBtn = document.querySelector('.delete'),
    parcent = document.querySelector('.parcent'),
    resultDisplayed = false,
    isCalculatorOn = true,
    memory = 0,
    base = 0,
    exponent = 0;
    


// ON/OFF gomb kezelése
function toggleCalculator() {
    isCalculatorOn = !isCalculatorOn;
    var screen = document.querySelector('.calculator_screen');
    var equalBtn = document.querySelector('.equalBtn');
    var numBtns = document.querySelectorAll('.num');
    var operatorBtns = document.querySelectorAll('.operatorBtn');
    var sciButtons = document.querySelectorAll('.sciButtons button');
    var clearBtns = document.querySelectorAll('.clear');
    var dotBtn = document.querySelector('.dot');

    if (isCalculatorOn) {
        enableButtons(screen, equalBtn, numBtns, operatorBtns, sciButtons, clearBtns, dotBtn);
        screen.style.opacity = 1; // Visszaállítjuk a kijelző átlátszóságát
    } else {
        disableButtons(screen, equalBtn, numBtns, operatorBtns, sciButtons, clearBtns, dotBtn);
        screen.style.opacity = 0.5; // Elsötétítjük a kijelzőt
    }

}

// Gombok engedélyezése
function enableButtons(screen, equalBtn, numBtns, operatorBtns, sciButtons, clearBtns, dotBtn) {
    screen.disabled = false;
    equalBtn.disabled = false;
    for (var i = 0; i < numBtns.length; i++) {
        numBtns[i].disabled = false;
    }
    for (var i = 0; i < operatorBtns.length; i++) {
        operatorBtns[i].disabled = false;
    }
    for (var i = 0; i < sciButtons.length; i++) {
        sciButtons[i].disabled = false;
    }
    for (var i = 0; i < clearBtns.length; i++) {
        clearBtns[i].disabled = false;
    }
    dotBtn.disabled = false;
}

// Gombok letiltása
function disableButtons(screen, equalBtn, numBtns, operatorBtns, sciButtons, clearBtns, dotBtn) {
    screen.disabled = true;
    screen.value = "";
    equalBtn.disabled = true;
    for (var i = 0; i < numBtns.length; i++) {
        numBtns[i].disabled = true;
    }
    for (var i = 0; i < operatorBtns.length; i++) {
        operatorBtns[i].disabled = true;
    }
    for (var i = 0; i < sciButtons.length; i++) {
        sciButtons[i].disabled = true;
    }
    for (var i = 0; i < clearBtns.length; i++) {
        clearBtns[i].disabled = true;
    }
    dotBtn.disabled = true;
}

// Gombok engedélyezése a bekapcsoláshoz
function enableCalculator() {
    isCalculatorOn = true;
    var screen = document.querySelector('.calculator_screen');
    var equalBtn = document.querySelector('.equalBtn');
    var numBtns = document.querySelectorAll('.num');
    var operatorBtns = document.querySelectorAll('.operatorBtn');
    var sciButtons = document.querySelectorAll('.sciButtons button');
    var clearBtns = document.querySelectorAll('.clear');
    var dotBtn = document.querySelector('.dot');

    enableButtons(screen, equalBtn, numBtns, operatorBtns, sciButtons, clearBtns, dotBtn);
    screen.style.opacity = 1; // Visszaállítjuk a kijelző átlátszóságát
}

// adding click handler to number buttons
for (var i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener('click', function (e) {

        // storing current input string and its last character in variables.
        var currentString = screen.value
        var lastChar = currentString[currentString.length - 1]

        if (resultDisplayed === false) {
            screen.value += e.target.innerHTML
        }

        else if (resultDisplayed === true && lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷") {
            resultDisplayed = false
            screen.value += e.target.innerHTML
        }

        else {
            resultDisplayed = false
            screen.value = ""
            screen.value += e.target.innerHTML
        }
    })
}


// adding click handler to operator buttons
for (var i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener('click', function (e) {

        // storing current input string and its last character in variables.
        var currentString = screen.value
        var lastChar = currentString[currentString.length - 1]

        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML
            screen.value = newString
        }

        else if (currentString.length == 0) {
            alert("Enter a number first.")
        }

        else {
            screen.value += e.target.innerHTML
        }
    })
}


// adding click handler to equal button
equalBtn.addEventListener('click', function () {
    var inputString = screen.value

    var numbers = inputString.split(/\+|\-|\×|\÷/g)

    var operators = inputString.replace(/[0-9]|\./g, "").split("")

    // console.log(inputString);
    // console.log(numbers);
    // console.log(operators);


    // now we are looping through the array and doing one operation at a time.
    // first divide, then multiply, then subtraction and then addition

    var divide = operators.indexOf("÷")
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1])
        operators.splice(divide, 1)
        divide = operators.indexOf("÷")
    }


    var multiply = operators.indexOf("×")
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1])
        operators.splice(multiply, 1)
        multiply = operators.indexOf("×")
    }


    var subtract = operators.indexOf("-")
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1])
        operators.splice(subtract, 1)
        subtract = operators.indexOf("-")
    }

    var add = operators.indexOf("+")
    while (add != -1) {

        // using parseFloat is necessary, otherwise it will show result in string concatenation.
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]))
        operators.splice(add, 1)
        add = operators.indexOf("+")
    }

    screen.value = numbers[0] // displaying the output
    resultDisplayed = true

})

//AC gomb kezelése
allClearBtn.addEventListener('click', function () {
    screen.value = ""
})

//DEL gomb kezelése
deleteBtn.addEventListener('click', function () {
    var deleteValue = screen.value.slice(0, -1)
    screen.value = deleteValue
})


/*parcent.addEventListener('click', function(){
    var par = eval(screen.value / 100)
    screen.value = par*/

// Százalék gomb kezelése
parcent.addEventListener('click', function () {
    if (!isCalculatorOn) return;
    var currentString = screen.value;
    var result = eval(currentString) / 100;
    screen.value = result;
    resultDisplayed = true;
});


// Tizedesjel kezelése
var decimalClicked = false;

function handleDecimal() {
    /*if (!isCalculatorOn) return;
    if (!decimalClicked)*/ {
        screen.value += '.';
        decimalClicked = true;
    }
}


function square() {
    var input = parseFloat(screen.value);
    var result = input * input;
    screen.value = result;
}

function cube() {
    var input = parseFloat(screen.value);
    var result = input * input * input;
    screen.value = result;
}

function power(n) {
    var input = parseFloat(screen.value);
    var result = Math.pow(input, n);
    screen.value = result;
}

function log() {
    var input = parseFloat(screen.value);
    var result = Math.log10(input);
    screen.value = result;
}

function ln() {
    var input = parseFloat(screen.value);
    var result = Math.log(input);
    screen.value = result;
}

function e() {
    var result = Math.exp(1);
    screen.value = result;
}

function cot() {
    var input = parseFloat(screen.value);
    var result = 1 / Math.tan(input);
    screen.value = result;
}

function cotx() {
    var input = parseFloat(screen.value);
    var result = Math.cos(input) / Math.sin(input);
    screen.value = result;
}

function asinh() {
    var input = parseFloat(screen.value);
    var result = Math.asinh(input);
    screen.value = result;
}

function asin() {
    var input = parseFloat(screen.value);
    var result = Math.asin(input);
    screen.value = result;
}

function sinh() {
    var input = parseFloat(screen.value);
    var result = Math.sinh(input);
    screen.value = result;
}

function sin() {
    var input = parseFloat(screen.value);
    var result = Math.sin(input);
    screen.value = result;
}

function cos() {
    var input = parseFloat(screen.value);
    var result = Math.cos(input);
    screen.value = result;
}

function cosh() {
    var input = parseFloat(screen.value);
    var result = Math.cosh(input);
    screen.value = result;
}

function acosh() {
    var input = parseFloat(screen.value);
    var result = Math.acosh(input);
    screen.value = result;
}

function acos() {
    var input = parseFloat(screen.value);
    var result = Math.acos(input);
    screen.value = result;
}

function tan() {
    var input = parseFloat(screen.value);
    var result = Math.tan(input);
    screen.value = result;
}

function tanh() {
    var input = parseFloat(screen.value);
    var result = Math.tanh(input);
    screen.value = result;
}

function atan() {
    var input = parseFloat(screen.value);
    var result = Math.atan(input);
    screen.value = result;
}

function atanh() {
    var input = parseFloat(screen.value);
    var result = Math.atanh(input);
    screen.value = result;
}

function squareRoot() {
    var input = parseFloat(screen.value);
    var result = Math.sqrt(input);
    screen.value = result;
}

function cubeRoot() {
    var input = parseFloat(screen.value);
    var result = Math.cbrt(input);
    screen.value = result;
}



/*// Memória gombok kezelése
function memoryStore() {
    memory = screen.value;
}
  
function memoryRecall() {
    screen.value = memory;
}
  
function memoryClear() {
    memory = 0;
}
  
function memoryAdd() {
    memory += parseFloat(screen.value);
}
  
function memorySubtract() {
    memory -= parseFloat(screen.value);
}*/







// Memória gombok kezelése
function memoryStore() {
    memory = screen.value;
}
  
function memoryRecall() {
    screen.value += parseFloat(memory);
}
  
function memoryClear() {
    memory = 0;
}
  
function memoryAdd() {
    memory = parseFloat(memory) + parseFloat(screen.value);
}
  
function memorySubtract() {
    memory = parseFloat(memory) - parseFloat(screen.value);
}




//Az x az y-odik hatványon gomb kezelése
function power1() {
    var base = parseFloat(screen.value);
    var exponent = parseFloat(prompt("Add meg a hatványkitevőt:"));
  
    var result = Math.pow(base, exponent);
  
    screen.value = result;
    resultDisplayed = true;
  }

  //javítsd a kódot úgy, hogy ne legyen prompt ablak, egyből írja ki a hatványértéket a számológép kijelzőjére!

  

  






