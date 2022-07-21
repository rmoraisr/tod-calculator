const keys = document.querySelector('.calculator-keys');

// Listening to key click
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
