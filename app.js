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
    let firstNum = calculator.dataset.firstNum;
    const operator = calculator.dataset.operator;
    let secondNum = currentDisplayNum;


    const createResultString = () => {
        // VAriables required
        // 1. key
        // 2. keyContent
        // 3. currentDisplayNum
        // 4. previousKeyType
        // 5. action

        /* Checking if the key pressed is a number. If it is, it checks if the current display number
        is 0, or if the previous key type was an operator or calculate. If it is, it returns the key
        content. Otherwise, it returns the current display number plus the key content. */
        if (key.className === 'key-number') {
            return currentDisplayNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
                ? keyContent
                : currentDisplayNum + keyContent;

            //TODO: add to calculator state: "calculator.dataset.previousKeyType = 'number';""
        }

        /* Checking if the previous key type was an operator or calculate, and if so, it returns 0.
        Otherwise, it checks if the current display number includes a decimal point. If it does, it
        returns the current display number. Otherwise, it returns the current display number plus a
        decimal point. */
        if (action === 'decimal') {
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
            if (!currentDisplayNum.includes('.')) return currentDisplayNum + '.'
            return currentDisplayNum // return when neither conditions are matched. Otherwise createResultString would return undefined

            //TODO: add to calculator state: "calculator.dataset.previousKeyType = 'decimal';""
        }
    };

    } else if (key.className === 'key-operator') {
        if (
            firstNum &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
        ) {
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
        display.textContent = '0';
        calculator.dataset.firstNum = '';
        calculator.dataset.secondNum = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = 'clear';
    } else if (action === 'changeSign') {
        display.textContent = currentDisplayNum * -1;
        calculator.dataset.firstNum = currentDisplayNum;
        calculator.dataset.previousKeyType = 'changeSign';
    } else if (action === 'delete') {
        if (currentDisplayNum !== '0' && previousKeyType === 'number') {
            if (currentDisplayNum.length > 1) {
                display.textContent = currentDisplayNum.slice(0, -1);
            } else if (currentDisplayNum.length === 1) {
                display.textContent = '0';
            }
        } else if (action === 'calculate') {
        if (firstNum) {
            if (previousKeyType === 'calculate') {
                firstNum = currentDisplayNum;
                secondNum = calculator.dataset.secondNum;
            }
            // perform a calculation just after a number is clicked
            display.textContent = operate(firstNum, secondNum, operator);
        }
        calculator.dataset.secondNum = secondNum;
        calculator.dataset.previousKeyType = 'calculate';
    }
});
