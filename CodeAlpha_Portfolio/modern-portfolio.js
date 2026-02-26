// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');

// Mobile Menu Toggle
function toggleNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth Scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.25)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
    }
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Project Details Toggle
function toggleProjectDetails(projectId) {
    const card = document.querySelector(`[data-project="${projectId}"]`);
    const button = card.querySelector('.view-details-btn');
    const icon = button.querySelector('i');
    
    // Check if details already exist
    let detailsDiv = card.querySelector('.project-details');
    
    if (detailsDiv) {
        // Collapse details
        detailsDiv.classList.remove('expanded');
        button.classList.remove('expanded');
        setTimeout(() => {
            if (detailsDiv.parentNode) {
                detailsDiv.parentNode.removeChild(detailsDiv);
            }
        }, 400);
    } else {
        // Create and expand details
        detailsDiv = document.createElement('div');
        detailsDiv.className = 'project-details';
        
        const projectData = getProjectData(projectId);
        detailsDiv.innerHTML = `
            <div class="project-details-content">
                <h4>Project Overview</h4>
                <p>${projectData.overview}</p>
                
                <h4>Key Features</h4>
                <ul>
                    ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <h4>Technical Challenges</h4>
                <p>${projectData.challenges}</p>
                
                <h4>Technologies Used</h4>
                <p>${projectData.technologies}</p>
            </div>
        `;
        
        card.appendChild(detailsDiv);
        
        // Expand with animation
        setTimeout(() => {
            detailsDiv.classList.add('expanded');
            button.classList.add('expanded');
        }, 50);
    }
}

// Project Data
function getProjectData(projectId) {
    const projects = {
        1: {
            overview: 'A full-featured e-commerce platform built with modern web technologies. Includes user authentication, payment processing, inventory management, and admin dashboard.',
            features: [
                'User registration and authentication system',
                'Shopping cart with real-time updates',
                'Secure payment gateway integration',
                'Product search and filtering',
                'Order tracking and history',
                'Admin dashboard with analytics'
            ],
            challenges: 'Implementing secure payment processing while maintaining excellent user experience. Optimizing database queries for large product catalogs.',
            technologies: 'React.js for frontend, Node.js for backend, MongoDB for database, Stripe for payments, JWT for authentication.'
        },
        2: {
            overview: 'A collaborative task management application designed for teams. Features real-time updates, drag-and-drop functionality, and team collaboration tools.',
            features: [
                'Real-time task synchronization',
                'Drag and drop task organization',
                'Team collaboration features',
                'Progress tracking and reporting',
                'Mobile-responsive design',
                'Push notifications'
            ],
            challenges: 'Implementing real-time synchronization across multiple devices while maintaining data consistency and handling offline scenarios.',
            technologies: 'React.js for frontend, Firebase for real-time database and authentication, Redux for state management, Tailwind CSS for styling.'
        },
        3: {
            overview: 'A comprehensive weather dashboard providing detailed forecasts and historical data visualization with beautiful, interactive charts.',
            features: [
                'Current weather conditions',
                '7-day weather forecast',
                'Historical data analysis',
                'Interactive weather maps',
                'Severe weather alerts',
                'Multiple location support'
            ],
            challenges: 'Integrating multiple weather APIs and ensuring data accuracy while creating smooth animations and transitions.',
            technologies: 'Vanilla JavaScript for core functionality, Chart.js for data visualization, OpenWeatherMap API for weather data, Geolocation API for location services.'
        },
        4: {
            overview: 'A comprehensive design system built to ensure consistency across multiple projects. Includes reusable components, documentation, and design guidelines.',
            features: [
                'Reusable UI components',
                'Design tokens and variables',
                'Component documentation',
                'Storybook integration',
                'Accessibility compliance',
                'Dark mode support'
            ],
            challenges: 'Creating flexible components that work across different contexts while maintaining design consistency and ensuring proper documentation.',
            technologies: 'Figma for design and prototyping, CSS for styling, Storybook for component documentation, CSS custom properties for theming.'
        },
        5: {
            overview: 'A secure mobile banking application featuring biometric authentication, real-time transactions, and comprehensive financial management tools.',
            features: [
                'Biometric authentication',
                'Real-time transaction updates',
                'Account management',
                'Bill payments and transfers',
                'Budget tracking',
                'Card management'
            ],
            challenges: 'Implementing secure biometric authentication and ensuring compliance with banking regulations while maintaining smooth user experience.',
            technologies: 'React Native for cross-platform mobile development, TypeScript for type safety, Node.js for backend, JWT for authentication, Stripe for payment processing.'
        },
        6: {
            overview: 'An advanced analytics platform providing comprehensive insights into user behavior, performance metrics, and business intelligence with customizable dashboards.',
            features: [
                'Real-time data visualization',
                'Custom dashboard creation',
                'User behavior analytics',
                'Performance monitoring',
                'Export functionality',
                'Automated reporting'
            ],
            challenges: 'Processing large datasets in real-time while maintaining smooth performance and creating intuitive data visualizations.',
            technologies: 'Vue.js for frontend, D3.js for data visualization, Python for backend data processing, PostgreSQL for database, WebSocket for real-time updates.'
        }
    };
    
    return projects[projectId] || projects[1];
}

// Contact Form
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate form
    const name = data.name.trim();
    const email = data.email.trim();
    const message = data.message.trim();
    
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'warning');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'warning');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Here you would normally send data to a server
        console.log('Form data:', data);
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }, 2000);
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span class="notification-text">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationBackground(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Inter', sans-serif;
        max-width: 350px;
        border-left: 4px solid ${getNotificationBorderColor(type)};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle',
        error: 'fa-times-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationBackground(type) {
    const backgrounds = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #667eea, #764ba2)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)'
    };
    return backgrounds[type] || backgrounds.info;
}

function getNotificationBorderColor(type) {
    const colors = {
        success: '#10b981',
        warning: '#f59e0b',
        info: '#667eea',
        error: '#ef4444'
    };
    return colors[type] || colors.info;
}

// Scroll Reveal Animation
function revealOnScroll() {
    projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight - 100) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}

// Add CSS for animations and interactions
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(10px);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-text {
        flex: 1;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .project-details {
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-details.expanded {
        max-height: 500px;
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initial scroll reveal
    revealOnScroll();
    
    // Add staggered animation to project cards
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
});

// Event Listeners
navToggle.addEventListener('click', toggleNav);
contactForm.addEventListener('submit', handleContactForm);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);
        closeNav();
    });
});

// Scroll events
window.addEventListener('scroll', function() {
    handleNavbarScroll();
    revealOnScroll();
});

// Window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeNav();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeNav();
    }
});

// Console welcome message
console.log('%c🎨 Modern Portfolio Loaded!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cClean design with soft cards and mobile-friendly UI', 'color: #764ba2; font-size: 14px;');
console.log('%cBuilt with glassmorphism and smooth interactions', 'color: #f093fb; font-size: 12px;');
