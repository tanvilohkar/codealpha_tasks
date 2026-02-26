# Modern Calculator Web Application

A fully functional, responsive calculator web application built with HTML, CSS, and JavaScript. Features a modern UI with dark mode support, keyboard interactions, and smooth animations.

## Features

### Core Functionality
- ✅ **Basic Arithmetic Operations**: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- ✅ **Decimal Support**: Handle decimal numbers with precision
- ✅ **Clear Functions**: Clear all (C) and backspace (⌫) operations
- ✅ **Real-time Display**: Dynamic display updates as you type
- ✅ **Error Handling**: Division by zero and invalid input protection

### Advanced Features
- ✅ **Keyboard Support**: Full keyboard navigation and input
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Responsive Design**: Optimized for desktop, tablet, and mobile
- ✅ **Smooth Animations**: Button press effects and transitions
- ✅ **Visual Feedback**: Hover states, active states, and keyboard highlighting

## File Structure

```
calculater/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling with theme support
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## Usage

### Mouse/Touch Controls
- Click or tap buttons to input numbers and operations
- Use the C button to clear all input
- Use the ⌫ button to delete the last digit
- Press = to calculate the result

### Keyboard Controls
- **Numbers**: 0-9 keys
- **Operators**: +, -, *, / keys
- **Equals**: Enter or = key
- **Clear**: Escape or C key
- **Delete**: Backspace key
- **Decimal**: . key

### Theme Toggle
- Click the moon/sun icon in the top-right corner to switch between light and dark themes
- Theme preference is saved in localStorage

## Technical Implementation

### HTML Structure
- Semantic HTML5 structure
- Accessibility features with ARIA labels
- Data attributes for keyboard mapping

### CSS Features
- CSS custom properties for theming
- Grid layout for button arrangement
- Flexbox for responsive design
- CSS animations and transitions
- Mobile-first responsive breakpoints

### JavaScript Architecture
- ES6 class-based structure
- Event-driven architecture
- State management for calculator operations
- Error handling and edge case management
- LocalStorage for theme persistence

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Error Handling

The calculator handles various edge cases:
- Division by zero
- Invalid number inputs
- Very large numbers (scientific notation)
- Floating point precision issues
- Maximum display length (12 characters)

## Performance Optimizations

- Efficient DOM manipulation
- Debounced keyboard events
- Optimized animations using CSS transforms
- Minimal JavaScript reflows
- Lazy loading of theme preferences

## Getting Started

1. Clone or download the project files
2. Open `index.html` in a web browser
3. Start calculating!

No build process or dependencies required - it's pure HTML, CSS, and JavaScript!

## Customization

### Adding New Operations
To add new operations (like square root, percentage, etc.):

1. Add buttons to `index.html`
2. Style them in `styles.css`
3. Implement the logic in the `calculate()` method in `script.js`

### Theme Customization
Modify the CSS custom properties in `:root` and `[data-theme="dark"]` to customize colors and styling.

### Layout Changes
Adjust the grid layout in `.buttons` class to change button arrangement.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this calculator application.

## License

This project is open source and available under the MIT License.
