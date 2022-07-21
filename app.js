const keys = document.querySelector('.calculator-keys');

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
    // aliases to make life easier
    const key = e.target;
    const keyContent = key.textContent;
    const action = key.dataset.action; // custom attribute created in the html

    if (key.className === 'key-number') {
        console.log(keyContent);
    } else if (key.className === 'key-operator') {
        console.log(keyContent);
    } else if (action === 'clear') {
        console.log(keyContent);
    } else if (action === 'changeSign') {
        console.log(keyContent);
    } else if (action === 'delete') {
        console.log(keyContent);
    } else if (action === 'decimal') {
        console.log(keyContent);
    } else if (action === 'calculate') {
        console.log(keyContent);
    }
});
