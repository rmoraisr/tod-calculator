// Select the keypad buttons
const keys = document.querySelector('.calculator-keys');
// Select the display area, where teh result will be shown
const display = document.querySelector('.calculator-display');
// Select the whole calculator. This element will save the key presses as a custom data attribute
const calculator = document.querySelector('.calculator');

/**
 * Given two numbers and an operator, return the result of the operation.
 * @param num1 - The first number to operate on.
 * @param num2 - The second number to operate on.
 * @param operator - The operator to use.
 * @returns the result of the operation.
 * @call operate(2, 4, 'add'); // 6
 */
function operate(num1, num2, operator) {
    num1 = Number(num1);
    num2 = Number(num2);
    const actions = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => a / b,
    };

    return actions[operator](num1, num2);
}

/* Listening to the click event on the keys. */
keys.addEventListener('click', (e) => {
    /* Getting the data from the event and the calculator. */
    const key = e.target;
    const keyContent = key.textContent; // content of the key pressed
    const action = key.dataset.action; // custom attribute created in the html
    const currentDisplayNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType; // custom data attribute of the calculator class
    const firstNum = calculator.dataset.firstNum;
    const operator = calculator.dataset.operator;
    const secondNum = currentDisplayNum;

    if (key.className === 'key-number') {
        calculator.dataset.previousKeyType = 'number';
        if (currentDisplayNum === '0' || previousKeyType === 'operator') {
            //!TODO: Fix the limitation after a operator is pressed
            display.textContent = keyContent;
        } else {
            display.textContent += keyContent; //!TODO: limit the number of chars
        }
    } else if (key.className === 'key-operator') {
        if (firstNum && operator && previousKeyType !== 'operator') {
            // Calculate a chain of numbers and operators
            const calcValue = operate(firstNum, secondNum, operator);
            display.textContent = calcValue;

            // Update the last calculate value as first value
            calculator.dataset.firstNum = calcValue;
        } else {
            // In case of no further calculations, se number in display is set to first value
            calculator.dataset.firstNum = currentDisplayNum;
        }
        calculator.dataset.previousKeyType = 'operator'; //add a custom data attribute
        //calculator.dataset.firstNum = currentDisplayNum; //add another custom data attribute
        calculator.dataset.operator = action;
    } else if (action === 'clear') {
        console.log(keyContent);
        calculator.dataset.previousKeyType = 'clear';
    } else if (action === 'changeSign') {
        console.log(keyContent);
        calculator.dataset.previousKeyType = 'changeSign';
    } else if (action === 'delete') {
        console.log(keyContent);
        calculator.dataset.previousKeyType = 'delete';
    } else if (action === 'decimal') {
        if (previousKeyType === 'operator') {
            display.textContent = '0.';
        } else if (!currentDisplayNum.includes('.')) {
            // do nothing if has already a decimal
            display.textContent = currentDisplayNum + '.';
        }
        calculator.dataset.previousKeyType = 'decimal';
    } else if (action === 'calculate') {
        display.textContent = operate(firstNum, secondNum, operator);
        calculator.dataset.previousKeyType = 'calculate';
    }
});
