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
          display.value += 'deg('; 
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
  