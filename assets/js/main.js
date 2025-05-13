/**
 * Latest Online Tools - Main JavaScript
 * Handles dynamic content, mobile menu, and form validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    updateCopyrightYear();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Populate latest tools
    populateLatestTools();
    
    // Initialize newsletter form
    initNewsletterForm();
});

/**
 * Updates the copyright year in the footer
 */
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initializes the mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav ul');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });
    }
}

/**
 * Populates the latest tools section with dynamic content
 */
function populateLatestTools() {
    const latestToolsContainer = document.getElementById('latest-tools-container');
    
    if (!latestToolsContainer) return;
    
    // Sample data for latest tools
    // In a real application, this would come from an API or backend
    const latestTools = [
        {
            name: 'Color Palette Generator',
            description: 'Create beautiful color schemes for your design projects with our AI-powered palette generator.',
            icon: 'palette',
            date: 'June 15, 2023'
        },
        {
            name: 'Markdown Editor',
            description: 'Write and preview Markdown with this intuitive editor featuring syntax highlighting and export options.',
            icon: 'markdown',
            date: 'May 28, 2023'
        },
        {
            name: 'JSON Formatter',
            description: 'Format and validate your JSON data with our easy-to-use tool. Supports minification and beautification.',
            icon: 'json',
            date: 'May 12, 2023'
        },
        {
            name: 'URL Shortener',
            description: 'Create shortened URLs for easier sharing. Includes click tracking and QR code generation.',
            icon: 'link',
            date: 'April 30, 2023'
        },
        {
            name: 'Unit Converter',
            description: 'Convert between different units of measurement including length, weight, volume, and more.',
            icon: 'convert',
            date: 'April 15, 2023'
        }
    ];
    
    // Create and append tool items to the container
    latestTools.forEach(tool => {
        const toolItem = document.createElement('div');
        toolItem.className = 'latest-tool-item';
        
        toolItem.innerHTML = `
            <div class="tool-header">
                <div class="tool-icon">
                    <img src="assets/images/tool-icons/${tool.icon}.svg" alt="${tool.name} Icon" width="32" height="32">
                </div>
                <div class="tool-info">
                    <h3>${tool.name}</h3>
                    <span class="tool-date">Added on ${tool.date}</span>
                </div>
            </div>
            <p>${tool.description}</p>
            <a href="#" class="tool-link">Learn More</a>
        `;
        
        latestToolsContainer.appendChild(toolItem);
    });
    
    // Add CSS for the dynamically created elements
    const style = document.createElement('style');
    style.textContent = `
        .latest-tool-item {
            background-color: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .latest-tool-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .tool-header {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .tool-icon {
            margin-right: 1rem;
        }
        
        .tool-info h3 {
            margin-bottom: 0.25rem;
        }
        
        .tool-date {
            font-size: 0.875rem;
            color: #6c757d;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initializes the newsletter form with validation and submission handling
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showFormError(emailInput, 'Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const submitButton = newsletterForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form
                newsletterForm.reset();
                
                // Show success message
                showFormSuccess('Thank you for subscribing! We\'ve sent a confirmation email.');
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }
}

/**
 * Validates an email address format
 * @param {string} email - The email address to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Shows an error message for a form input
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showFormError(input, message) {
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and append error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.5rem';
    
    input.parentElement.appendChild(errorElement);
    
    // Highlight input
    input.style.borderColor = '#dc3545';
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorElement.remove();
        input.style.borderColor = '';
    }, 3000);
}

/**
 * Shows a success message after form submission
 * @param {string} message - The success message
 */
function showFormSuccess(message) {
    const newsletterForm = document.getElementById('newsletter-form');
    
    // Create success message element
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    successElement.style.color = '#28a745';
    successElement.style.backgroundColor = '#d4edda';
    successElement.style.padding = '1rem';
    successElement.style.borderRadius = '8px';
    successElement.style.marginTop = '1rem';
    
    // Insert after form
    newsletterForm.parentElement.insertBefore(successElement, newsletterForm.nextSibling);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successElement.remove();
    }, 5000);
}
