const display = document.getElementById('display');

    let currentValue = '0';
    let previousValue = null;
    let operator = null;
    let waitingForNewValue = false;

    function updateDisplay() {
      display.value = currentValue;
    }

    function clearDisplay() {
      currentValue = '0';
      previousValue = null;
      operator = null;
      waitingForNewValue = false;
      updateDisplay();
    }

    function appendNumber(value) {
      if (waitingForNewValue) {
        currentValue = value;
        waitingForNewValue = false;
      } else {
        currentValue = currentValue === '0' ? value : currentValue + value;
      }
      updateDisplay();
    }

    function appendDecimal() {
      if (waitingForNewValue) {
        currentValue = '0.';
        waitingForNewValue = false;
        updateDisplay();
        return;
      }

      if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
      }
    }

    function appendOperator(nextOperator) {
      const inputValue = Number(currentValue);

      if (previousValue === null) {
        previousValue = inputValue;
      } else if (operator) {
        previousValue = operate(previousValue, inputValue, operator);
      }

      waitingForNewValue = true;
      operator = nextOperator;
      currentValue = String(previousValue);
      updateDisplay();
    }

    function operate(a, b, op) {
      switch (op) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          return b === 0 ? 'Error' : a / b;
        default:
          return b;
      }
    }

    function calculateResult() {
      if (operator === null || previousValue === null || waitingForNewValue) return;

      const result = operate(previousValue, Number(currentValue), operator);

      currentValue = String(result);
      previousValue = null;
      operator = null;
      waitingForNewValue = false;
      updateDisplay();
    }

    function backspace() {
      if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
      } else {
        currentValue = '0';
      }
      updateDisplay();
    }

    updateDisplay();