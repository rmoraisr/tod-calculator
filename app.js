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
});

const createResultString = () => {
    //! VAriables required
    // 1. key
    // 2. keyContent
    // 3. currentDisplayNum
    // 4. previousKeyType
    // 5. action
    // 6. calculator.dataset.firstNum
    // 7. calculator.dataset.operator
    // 8. calculator.dataset.secondNum

    /* Checking if the key pressed is a number. If it is, it checks if the current display number
        is 0, or if the previous key type was an operator or calculate. If it is, it returns the key
        content. Otherwise, it returns the current display number plus the key content. */
    if (key.className === 'key-number') {
        return currentDisplayNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
            ? keyContent
            : currentDisplayNum + keyContent;
    }

    /* Checking if the previous key type was an operator or calculate, and if so, it returns 0.
        Otherwise, it checks if the current display number includes a decimal point. If it does, it
        returns the current display number. Otherwise, it returns the current display number plus a
        decimal point. */
    if (action === 'decimal') {
        if (previousKeyType === 'operator' || previousKeyType === 'calculate')
            return '0.';
        if (!currentDisplayNum.includes('.')) return currentDisplayNum + '.';
        return currentDisplayNum; // return when neither conditions are matched. Otherwise createResultString would return undefined
    }

    if (key.className === 'key-operator') {
        const firstNum = calculator.dataset.firstNum; //TODO: move to a new function
        const operator = calculator.dataset.operator; // TODO: move to a new function

        return firstNum &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
            ? operate(firstNum, currentDisplayNum, operator)
            : currentDisplayNum;
    }

    if (action === 'clear') return 0;

    if (action === 'calculate') {
        const firstNum = calculator.dataset.firstNum;
        const operator = calculator.dataset.operator;
        const secondNum = calculator.dataset.secondNum;

        if (firstNum) {
            return previousKeyType === 'calculate'
                ? operate(firstNum, secondNum, operator)
                : operate(firstNum, currentDisplayNum, operator);
        } else {
            return currentDisplayNum;
        }
    }

    if (action === 'changeSign') {
        currentDisplayNum = currentDisplayNum * -1;
        calculator.dataset.firstNum = currentDisplayNum;
        return currentDisplayNum;
    }

    if (action === 'delete') {
        return currentDisplayNum !== '0' &&
            (previousKeyType === 'number' || previousKeyType === 'decimal') &&
            currentDisplayNum.length > 1
            ? currentDisplayNum.slice(0, -1)
            : currentDisplayNum.length < 1
            ? '0'
            : currentDisplayNum;
    }
};
