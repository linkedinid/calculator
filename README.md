# Scientific Calculator

A web-based scientific calculator built with HTML, CSS, and JavaScript. This calculator supports both basic and advanced mathematical operations, and allows input through both mouse clicks and keyboard.

## Features

- **Basic Arithmetic Operations**: Addition, subtraction, multiplication, division.
- **Advanced Functions**: Square root, exponentiation, trigonometric functions (sin, cos, tan), logarithmic functions (ln, log), and more.
- **Constants**: Pi (π) and Euler's number (e).
- **Keyboard Input Support**: Users can input through the keyboard when using the calculator on a computer system.

## Usage

### Mouse Input

- Click the buttons on the calculator to perform operations.
- Use the `AC` button to clear the display.
- Use the `C` button to delete the last character.

### Keyboard Input

- Use the numeric keys (0-9) for numbers.
- Use `+`, `-`, `*`, `/`, and `.` for arithmetic operations.
- Use `Enter` to evaluate the expression.
- Use `Backspace` to delete the last character.
- Use `Escape` to clear the display.
- For scientific operations, type the function name (e.g., `sin`, `cos`, `tan`, `log`, `ln`) followed by `(`.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Jahnavi-Anand/CODSOFT-CALC.git
    ```
2. Open `index.html` in your web browser to start using the calculator.

## Code Overview

### HTML

The structure of the calculator is defined in `index.html`. It includes buttons for all supported operations and a display area.

### CSS

The styling for the calculator is in `styles.css`. It includes layout styling to position the buttons and display correctly.

### JavaScript

The functionality of the calculator is implemented in `script.js`. It handles both button clicks and keyboard inputs, evaluates mathematical expressions, and updates the display.

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.calculator .keys button');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      handleButtonClick(button.textContent);
    });
  });

  document.addEventListener('keydown', function(event) {
    handleKeyPress(event.key);
  });

  function handleButtonClick(buttonText) {
    if (buttonText === 'AC') {
      display.value = '';
    } else if (buttonText === 'C') {
      display.value = display.value.slice(0, -1);
    } else if (buttonText === '=') {
      evaluateExpression();
    } else {
      if (isScientificOperation(buttonText)) {
        handleScientificOperation(buttonText);
      } else {
        display.value += buttonText;
      }
    }
  }

  function handleKeyPress(key) {
    if (key === 'Enter') {
      evaluateExpression();
    } else if (key === 'Backspace') {
      display.value = display.value.slice(0, -1);
    } else if (key === 'Escape') {
      display.value = '';
    } else if (isScientificOperation(key)) {
      handleScientificOperation(key);
    } else {
      if (isNumericOrOperator(key)) {
        display.value += key;
      }
    }
  }

  function isScientificOperation(key) {
    return ['sqrt', 'deg', 'π', '^', 'sin', 'cos', 'tan', 'ln', 'log', 'e', '!'].includes(key);
  }

  function isNumericOrOperator(key) {
    return /[0-9+\-*/().%^]/.test(key);
  }

  function evaluateExpression() {
    try {
      let expression = display.value.replace(/π/g, Math.PI).replace(/e/g, Math.E);
      // Handling factorial operation
      expression = expression.replace(/(\d+)!/g, (match, number) => factorial(parseInt(number)));
      // Convert trigonometric functions to radians
      expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1 * (Math.PI / 180))');
      expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1 * (Math.PI / 180))');
      expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1 * (Math.PI / 180))');
      // Handle exponentiation
      expression = expression.replace(/\^/g, '**');
      // Evaluate the expression
      display.value = parseFloat(new Function('return ' + expression)()).toFixed(10);
    } catch (error) {
      display.value = 'Error';
    }
  }

  function handleScientificOperation(operation) {
    switch (operation) {
      case 'sqrt':
        display.value += 'Math.sqrt(';
        break;
      case 'deg':
        display.value += 'deg('; // Note: You might need a deg function to handle degree conversion
        break;
      case 'π':
        display.value += 'π';
        break;
      case '^':
        display.value += '^';
        break;
      case 'sin':
        display.value += 'sin(';
        break;
      case 'cos':
        display.value += 'cos(';
        break;
      case 'tan':
        display.value += 'tan(';
        break;
      case 'ln':
        display.value += 'Math.log(';
        break;
      case 'log':
        display.value += 'Math.log10(';
        break;
      case 'e':
        display.value += 'e';
        break;
      case '!':
        display.value += '!';
        break;
      case '.':
        if (!display.value.includes('.')) {
          display.value += '.';
        }
        break;
      case '%':
        display.value = `(${display.value} / 100)`;
        break;
      case '(':
        display.value += '(';
        break;
      case ')':
        display.value += ')';
        break;
      default:
        break;
    }
  }

  function factorial(num) {
    if (num < 0) return 'Error';
    else if (num === 0) return 1;
    else return num * factorial(num - 1);
  }
});
```



## Acknowledgements

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) for the core functionality.
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) for styling.
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) for the structure.
