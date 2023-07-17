const resultInput = document.querySelector('input[name="result"]');
const buttons = document.querySelectorAll('.calculator input[type="button"]');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;

    if (value === '=') {
      try {
        const result = calculateResult(resultInput.value);
        resultInput.value = result;
      } catch (error) {
        resultInput.value = 'Error: ' + error.message;
      }
    } else if (value === 'C') {
      resultInput.value = '';
    } else if (value === 'DE') {
      resultInput.value = resultInput.value.slice(0, -1);
    } else {
      resultInput.value += value;
      if (resultInput.value.startsWith('Error')) {
        resultInput.value = resultInput.value.replace(/^Error:.*/, '');
      }
    }
  });
});


let calculateResult = (expression) => {
  const operators = ['+', '-', 'X', '÷'];
  let numbers = expression.split(/[-+X÷]/g);
  let operands = expression.match(/[-+X÷]/g);

  numbers = numbers.filter(Boolean).map(parseFloat);


  if (numbers.length === 0 || numbers.includes(NaN)) {
    throw new Error('Invalid expression');
  }
  let result = numbers[0];
  for (let i = 0; i < operands.length; i++) {
    const operator = operands[i];
    const nextNumber = numbers[i + 1];

    if (!operators.includes(operator) || isNaN(nextNumber)) {
      throw new Error('Invalid expression');
    }

    switch (operator) {
      case '+':
        result += nextNumber;
        break;
      case '-':
        result -= nextNumber;
        break;
      case 'X':
        result *= nextNumber;
        break;
      case '÷':
        if (nextNumber === 0) {
          throw new Error('Division by zero');
        }
        result /= nextNumber;
        break;
      default:
        throw new Error('Invalid operator');
    }
  }

  return result.toFixed(3);
}
