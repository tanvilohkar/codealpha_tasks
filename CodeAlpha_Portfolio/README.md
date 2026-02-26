# Modern Portfolio Website

A stunning, feature-rich personal portfolio website built for Tanvi N. Lohkar using HTML, CSS, and JavaScript featuring glassmorphism design, smooth animations, and cutting-edge UI/UX.

## ✨ Features

### 🎨 Design & UI
- **Glassmorphism Design**: Modern frosted glass effect with backdrop filters
- **Gradient Theme**: Beautiful color gradients throughout the design
- **Dark/Light Mode Toggle**: Switch between themes with smooth transitions
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Custom Cursor**: Animated cursor effect for desktop users
- **Loading Screen**: Professional loading animation on page load

### 🚀 Interactive Elements
- **Animated Hero Section**: Dynamic gradient background with floating particles and typing animation
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Sticky Navigation**: Fixed navbar that changes appearance on scroll
- **Scroll Reveal Animations**: Elements animate in as you scroll
- **Interactive Project Cards**: Hover effects with overlay animations
- **Animated Skill Bars**: Progress bars that animate when visible
- **Project Filtering**: Filter projects by category (Web Apps, Mobile, Design)
- **Testimonials Slider**: Auto-rotating client testimonials with manual controls
- **Timeline Animation**: Animated experience timeline with staggered effects

### 📱 Sections
1. **Hero Section**: Name, title, animated typing effect, call-to-action buttons, social links, floating particles
2. **About Section**: Profile image, personal description, contact information
3. **Skills Section**: Categorized skills with animated progress bars
4. **Projects Section**: Interactive project cards with filtering capabilities
5. **Testimonials Section**: Client testimonials with auto-rotating slider
6. **Timeline Section**: Professional experience timeline with animations
7. **Contact Section**: Working contact form with validation and success notifications

### 🎯 Advanced Features
- **Typing Animation**: Dynamic role text animation in hero section
- **Scroll Reveal**: Elements fade in as you scroll down the page
- **Project Filtering**: Interactive buttons to filter projects by category
- **Micro-interactions**: Hover effects, transitions, and subtle animations
- **Particle System**: Floating particles in hero section for visual appeal
- **Social Share**: Floating social media sharing buttons
- **Auto-rotating Testimonials**: Client testimonials that advance automatically
- **Staggered Timeline Animations**: Timeline items animate in sequence
- **Easter Egg**: Konami code activation for rainbow effect
- **Performance Optimized**: Debounced scroll events and efficient animations
- **Keyboard Navigation**: Support for keyboard shortcuts

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with proper structure
- **CSS3**: Modern CSS with glassmorphism, gradients, and animations
- **Vanilla JavaScript**: No frameworks, pure JavaScript for all interactions
- **Font Awesome**: Icon library for social links and UI elements
- **Google Fonts**: Inter font family for modern typography

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in your preferred web browser
3. **No build process required** - it's ready to use!

## 🎨 Customization

### Personal Information
Edit the following in `index.html`:
- Name and title in hero section (currently: Tanvi N. Lohkar)
- About section content
- Skills and proficiency levels
- Project information
- Testimonials content
- Timeline experience
- Contact details (currently: tanulohkar@gmail.com)

### Colors & Theme
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... other variables */
}
```

### Add Projects
Add new project cards in the projects section:
```html
<div class="project-card" data-category="web">
    <div class="project-image">
        <img src="your-image.jpg" alt="Project Name">
        <!-- ... -->
    </div>
    <div class="project-content">
        <h3>Your Project</h3>
        <p>Project description</p>
        <!-- ... -->
    </div>
</div>
```

### Add Testimonials
Add new testimonials to the slider:
```html
<div class="testimonial-card">
    <div class="testimonial-content">
        <div class="quote-icon">
            <i class="fas fa-quote-left"></i>
        </div>
        <p>"Your testimonial text here..."</p>
        <div class="testimonial-author">
            <img src="person.jpg" alt="Name" class="author-image">
            <div class="author-info">
                <h4>Person Name</h4>
                <p>Company/Title</p>
            </div>
        </div>
        <div class="testimonial-rating">
            <i class="fas fa-star"></i>
            <!-- Add more stars as needed -->
        </div>
    </div>
</div>
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (includes custom cursor)
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

## 🎯 Browser Compatibility

- Chrome (Recommended)
- Firefox
- Safari
- Edge
- All modern browsers with CSS Grid and Flexbox support

## 🌟 Key Features Explained

### Glassmorphism Effect
The design uses backdrop-filter and semi-transparent backgrounds to create a modern frosted glass effect that adapts to both light and dark themes.

### Particle System
Floating particles in the hero section create visual interest and depth with random positions, sizes, and animations.

### Testimonials Slider
Auto-rotating testimonials with manual controls, smooth transitions, and dot indicators for navigation.

### Timeline Animation
Experience timeline with staggered animations that trigger as items come into viewport.

### Custom Cursor
Desktop-only feature that adds a custom animated cursor that responds to mouse movements and clicks.

### Loading Screen
Professional loading animation that displays while the page initializes, creating a polished first impression.

### Social Share Integration
Floating social media buttons allow visitors to share the portfolio on various platforms or copy the link.

## 🔧 Advanced Features

### Performance Optimizations
- Debounced scroll events for better performance
- Efficient DOM queries and event delegation
- CSS animations instead of JavaScript where possible
- Lazy loading considerations for animations

### Accessibility
- Semantic HTML5 structure
- Proper heading hierarchy
- Keyboard navigation support
- Focus states for interactive elements
- Screen reader friendly markup

### Easter Eggs
Try the Konami code (↑↑↓↓←→←→BA) for a surprise rainbow effect!

## 🎨 Design Inspiration

This portfolio combines modern web design trends including:
- Glassmorphism and neumorphism
- Gradient aesthetics
- Micro-interactions
- Smooth animations
- Minimal yet impactful design
- Particle effects
- Custom cursors

## 📞 Contact Form

The contact form includes:
- Form validation
- Success notifications
- Smooth animations
- Mobile-friendly layout

Note: The form currently shows a success message but doesn't actually send emails. To make it functional, you'll need to integrate with a backend service or use a service like Formspree, Netlify Forms, or EmailJS.

## � Interactive Elements

### Keyboard Shortcuts
- **Escape**: Close mobile menu
- **Konami Code**: Activate rainbow easter egg

### Touch Support
- Mobile swipe gestures support
- Touch-optimized interactions
- Responsive touch targets

### Auto-Features
- Auto-rotating testimonials (5-second intervals)
- Auto-hiding loading screen
- Auto-triggering scroll animations

## 📊 Performance Metrics

- **First Contentful Paint**: Optimized with efficient CSS
- **Largest Contentful Paint**: Lazy loading considerations
- **Cumulative Layout Shift**: Minimal with proper sizing
- **First Input Delay**: Optimized JavaScript execution

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using HTML, CSS, and JavaScript**

**Version 2.0 - Enhanced with advanced features and interactions**
