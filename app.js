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

const createResultString = (key, currentDisplayNum, state) => {
    const keyContent = key.textContent; // content of the key pressed
    const keyType = getKeyType(key);
    const { firstNum, secondNum, operator, previousKeyType } = state;

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
    if (keyType === 'decimal') {
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

    if (keyType === 'clear') return 0;

    if (keyType === 'calculate') {
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

    if (keyType === 'changeSign') {
        currentDisplayNum = currentDisplayNum * -1;
        calculator.dataset.firstNum = currentDisplayNum;
        return currentDisplayNum;
    }

    if (keyType === 'delete') {
        //TODO: Check, probably bug
        return currentDisplayNum !== '0' &&
            (previousKeyType === 'number' || previousKeyType === 'decimal') &&
            currentDisplayNum.length >= 1
            ? currentDisplayNum.slice(0, -1)
            : currentDisplayNum.length === 1
            ? '0'
            : currentDisplayNum;
    }
};

/**
 * If the key has a data-action attribute, return the value of that attribute. Otherwise, return the
 * string 'number'
 * @param key - The key that was pressed
 * @returns The type of key that is being pressed.
 */
const getKeyType = (key) => {
    const action = key.dataset.action;
    if (!action) return 'number';
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    )
        return 'operator';
    // For everything else
    return action;
};

const updateCalculatorState = (
    key,
    calculator,
    calcValue,
    currentDisplayNum
) => {
    // Variables and properties needed
    // 1. key
    // 2. calculator
    // 3. calcValue
    // 4. currentDisplayNum
    //

    const keyType = getKeyType(key);
    const { firstNum, operator, secondNum, previousKeyType } =
        calculator.dataset;
    calculator.dataset.previousKeyType = keyType;

    if (keyType === 'operator') {
        calculator.dataset.operator = key.dataset.action;
        calculator.dataset.firstNum =
            firstNum &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
                ? calcValue
                : currentDisplayNum;
    }

    if (keyType === 'clear') {
        calculator.dataset.firstNum = '';
        calculator.dataset.secondNum = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = 'clear';
    }

    if (keyType === 'calculate') {
        calculator.dataset.secondNum =
            firstNum && previousKeyType === 'calculate'
                ? secondNum
                : currentDisplayNum;
    }
};
/**
 *================================================================
 * ========== Variables assignments and Functions Call ==========
 * ===============================================================
 */

const keys = document.querySelector('.calculator-keys'); // Select the keypad buttons
const display = document.querySelector('.calculator-display'); // Select the display area, where teh result will be shown
const calculator = document.querySelector('.calculator'); // Select the whole calculator. This element will save the key presses as a custom data attribute

/* Listening to the click event on the keys. */
keys.addEventListener('click', (e) => {
    const key = e.target;
    const currentDisplayNum = display.textContent;
    const state = calculator.dataset; // key to access custom data attribute of the calculator class
    const resultString = createResultString(key, currentDisplayNum, state);
    display.textContent = resultString;
    updateCalculatorState(key, calculator, resultString, currentDisplayNum);
});
console.log(calculator.dataset);
