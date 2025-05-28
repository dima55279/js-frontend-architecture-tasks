// BEGIN
const calculator = () => {
    const input = document.querySelector('[type="number"]');
    input.focus();
    const plus = document.querySelector('[type="submit"]');
    plus.addEventListener('click', (e) => {
        e.preventDefault();
        result.textContent = (parseInt(result.textContent) + parseInt(input.value)).toString();
        input.value = '';
        input.focus();
    })
    const reset = document.querySelector('[type="button"]');
    reset.addEventListener('click', (e) => {
        e.preventDefault();
        result.textContent = '0';
        input.value = '';
        input.focus();
    })
    const result = document.getElementById('result');
}
export default calculator;
// END