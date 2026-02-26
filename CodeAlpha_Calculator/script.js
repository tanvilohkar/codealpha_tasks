// Calculator State Management
class Calculator {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.error = false;
        
        // DOM Elements
        this.display = document.getElementById('display');
        this.buttons = document.querySelectorAll('.btn');
        this.themeToggleBtn = document.getElementById('theme-toggle-btn');
        this.themeIcon = document.querySelector('.theme-icon');
        
        // Initialize
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupKeyboardSupport();
        this.setupThemeToggle();
        this.updateDisplay();
    }
    
    // Event Listeners Setup
    setupEventListeners() {
        // Button click events
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonId = e.target.id;
                this.handleButtonClick(buttonId);
                this.animateButton(e.target);
            });
        });
    }
    
    // Keyboard Support
    setupKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            const button = document.querySelector(`[data-key="${key}"]`) || 
                          document.querySelector(`[data-key="${key.toLowerCase()}"]`);
            
            if (button) {
                e.preventDefault();
                button.click();
                this.highlightKeyboardButton(button);
            }
            
            // Handle special cases
            if (key === 'Enter' || key === '=') {
                document.getElementById('equals').click();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                document.getElementById('clear').click();
            } else if (key === 'Backspace') {
                document.getElementById('delete').click();
            }
        });
    }
    
    // Theme Toggle Setup
    setupThemeToggle() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('calculator-theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            this.updateThemeIcon(savedTheme);
        }
        
        this.themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('calculator-theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }
    
    updateThemeIcon(theme) {
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Button Animation
    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);
    }
    
    // Keyboard Button Highlight
    highlightKeyboardButton(button) {
        button.classList.add('keyboard-highlight');
        setTimeout(() => {
            button.classList.remove('keyboard-highlight');
        }, 300);
    }
    
    // Handle Button Clicks
    handleButtonClick(buttonId) {
        if (this.error) {
            this.clearError();
        }
        
        switch(buttonId) {
            case 'zero':
            case 'one':
            case 'two':
            case 'three':
            case 'four':
            case 'five':
            case 'six':
            case 'seven':
            case 'eight':
            case 'nine':
                this.appendNumber(buttonId);
                break;
            case 'decimal':
                this.appendDecimal();
                break;
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.setOperation(buttonId);
                break;
            case 'equals':
                this.calculate();
                break;
        }
        
        this.updateDisplay();
    }
    
    // Number Input
    appendNumber(number) {
        const numberMap = {
            'zero': '0',
            'one': '1',
            'two': '2',
            'three': '3',
            'four': '4',
            'five': '5',
            'six': '6',
            'seven': '7',
            'eight': '8',
            'nine': '9'
        };
        
        const digit = numberMap[number];
        
        if (this.shouldResetScreen) {
            this.currentInput = '0';
            this.shouldResetScreen = false;
        }
        
        if (this.currentInput === '0') {
            this.currentInput = digit;
        } else if (this.currentInput.length < 12) { // Limit display length
            this.currentInput += digit;
        }
    }
    
    // Decimal Point
    appendDecimal() {
        if (this.shouldResetScreen) {
            this.currentInput = '0';
            this.shouldResetScreen = false;
        }
        
        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
    }
    
    // Clear Functions
    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.error = false;
        document.querySelector('.calculator').classList.remove('error');
    }
    
    delete() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
    }
    
    // Operation Setting
    setOperation(op) {
        const operationMap = {
            'add': '+',
            'subtract': '-',
            'multiply': '*',
            'divide': '/'
        };
        
        if (this.operation !== null && !this.shouldResetScreen) {
            this.calculate();
        }
        
        this.previousInput = this.currentInput;
        this.operation = operationMap[op];
        this.shouldResetScreen = true;
    }
    
    // Calculation
    calculate() {
        if (this.operation === null) return;
        
        let result;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        
        // Handle edge cases
        if (isNaN(prev) || isNaN(current)) {
            this.showError('Invalid input');
            return;
        }
        
        // Perform calculation based on operation
        switch(this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.showError('Cannot divide by zero');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        // Handle very large or very small numbers
        if (!isFinite(result)) {
            this.showError('Result too large');
            return;
        }
        
        // Round result to avoid floating point precision issues
        result = Math.round(result * 100000000) / 100000000;
        
        this.currentInput = result.toString();
        this.operation = null;
        this.previousInput = '';
        this.shouldResetScreen = true;
    }
    
    // Error Handling
    showError(message) {
        this.error = true;
        this.currentInput = message;
        document.querySelector('.calculator').classList.add('error');
        this.shouldResetScreen = true;
    }
    
    clearError() {
        this.error = false;
        document.querySelector('.calculator').classList.remove('error');
    }
    
    // Display Update
    updateDisplay() {
        // Format display for better readability
        let displayValue = this.currentInput;
        
        // Show the full operation when an operator is set
        if (this.operation !== null && this.previousInput !== '') {
            const operatorSymbol = {
                '+': '+',
                '-': '−',
                '*': '×',
                '/': '÷'
            };
            displayValue = `${this.previousInput} ${operatorSymbol[this.operation]} ${this.shouldResetScreen ? '' : this.currentInput}`;
        }
        
        // Handle very long numbers
        if (displayValue.length > 12) {
            if (displayValue.includes('.')) {
                // Truncate decimal places for long numbers
                const parts = displayValue.split('.');
                if (parts[0].length > 9) {
                    displayValue = parseFloat(displayValue).toExponential(4);
                } else {
                    displayValue = parseFloat(displayValue).toFixed(12 - parts[0].length);
                }
            } else {
                displayValue = parseFloat(displayValue).toExponential(4);
            }
        }
        
        // Remove trailing zeros after decimal point
        if (displayValue.includes('.') && !displayValue.includes(' ')) {
            displayValue = displayValue.replace(/\.?0+$/, '');
        }
        
        this.display.textContent = displayValue || '0';
    }
}

// Initialize Calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    
    // Add visual feedback for loading
    setTimeout(() => {
        document.querySelector('.calculator').style.opacity = '1';
    }, 100);
});

// Prevent zoom on double tap for mobile
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
});
