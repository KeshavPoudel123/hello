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
 * Initializes the mobile menu toggle functionality and search toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNavContainer = document.querySelector('.main-nav');
    const mainNav = document.querySelector('.main-nav ul');
    const searchToggle = document.getElementById('search-toggle');
    const mobileSearch = document.querySelector('.mobile-search');

    // Create close button for mobile menu
    if (mainNav && window.innerWidth <= 767) {
        // Remove existing close button if it exists
        const existingCloseButton = mainNav.querySelector('.mobile-menu-close');
        if (existingCloseButton) {
            existingCloseButton.remove();
        }

        const closeButton = document.createElement('div');
        closeButton.className = 'mobile-menu-close';
        closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        document.body.appendChild(closeButton);

        // Add event listener to close button
        closeButton.addEventListener('click', function() {
            mainNavContainer.classList.remove('active');
            mainNav.classList.remove('show');
            if (menuToggle) menuToggle.classList.remove('active');
            document.body.style.overflow = '';
            closeButton.style.display = 'none';
        });

        // Show the close button when menu is active
        closeButton.style.display = 'flex';
    }

    // Mobile menu toggle
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNavContainer.classList.toggle('active');
            mainNav.classList.toggle('show');
            menuToggle.classList.toggle('active');

            // Prevent body scrolling when menu is open
            if (mainNav.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }

            // Hide search when menu is toggled
            if (mobileSearch && mobileSearch.classList.contains('show')) {
                mobileSearch.classList.remove('show');
            }
        });
    }

    // Search toggle for mobile
    if (searchToggle && mobileSearch) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileSearch.classList.toggle('show');

            // Focus the search input when shown
            if (mobileSearch.classList.contains('show')) {
                // Hide the search icon when search is open
                searchToggle.style.display = 'none';

                // Position the search box below the header
                const header = document.querySelector('.site-header');
                if (header) {
                    const headerHeight = header.offsetHeight;
                    mobileSearch.style.top = headerHeight + 'px';
                }

                const searchInput = mobileSearch.querySelector('.search-box');
                if (searchInput) {
                    searchInput.focus();
                }

                // Hide menu if it's open
                if (mainNav.classList.contains('show')) {
                    mainNavContainer.classList.remove('active');
                    mainNav.classList.remove('show');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            } else {
                // Show the search icon when search is closed
                searchToggle.style.display = 'flex';
            }
        });
    }

    // Close menu when clicking on the overlay
    mainNavContainer && mainNavContainer.addEventListener('click', function(e) {
        if (e.target === mainNavContainer) {
            mainNavContainer.classList.remove('active');
            mainNav.classList.remove('show');
            if (menuToggle) menuToggle.classList.remove('active');
            document.body.style.overflow = '';

            // Hide close button
            const closeButton = document.querySelector('.mobile-menu-close');
            if (closeButton) {
                closeButton.style.display = 'none';
            }
        }
    });

    // Close menu and search when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mainNav && (mainNav.contains(event.target) || (menuToggle && menuToggle.contains(event.target)));
        const isClickInsideSearch = mobileSearch && (mobileSearch.contains(event.target) || (searchToggle && searchToggle.contains(event.target)));

        if (!isClickInsideNav && mainNav && mainNav.classList.contains('show')) {
            mainNavContainer.classList.remove('active');
            mainNav.classList.remove('show');
            if (menuToggle) menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (!isClickInsideSearch && mobileSearch && mobileSearch.classList.contains('show')) {
            mobileSearch.classList.remove('show');
            // Show the search icon again when search is closed by clicking outside
            if (searchToggle) {
                searchToggle.style.display = 'flex';
            }
        }
    });

    // Add mobile dropdown functionality
    function setupMobileDropdowns() {
        if (window.innerWidth <= 767) {
            const navItems = document.querySelectorAll('.main-nav ul li');

            // First, hide all dropdown menus by default
            navItems.forEach(item => {
                const dropdown = item.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            });

            navItems.forEach(item => {
                const link = item.querySelector('a');
                if (link && item.querySelector('.dropdown-menu')) {
                    // Remove existing event listeners
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);

                    // Add new event listener
                    newLink.addEventListener('click', function(e) {
                        // Only prevent default if it has a dropdown
                        if (item.querySelector('.dropdown-menu')) {
                            e.preventDefault();
                            e.stopPropagation();

                            // Close any other open dropdowns
                            navItems.forEach(otherItem => {
                                if (otherItem !== item && otherItem.classList.contains('active')) {
                                    otherItem.classList.remove('active');
                                    const otherDropdown = otherItem.querySelector('.dropdown-menu');
                                    if (otherDropdown) {
                                        otherDropdown.style.display = 'none';
                                    }
                                }
                            });

                            // Toggle the active class
                            item.classList.toggle('active');

                            // Toggle the dropdown display
                            const dropdown = item.querySelector('.dropdown-menu');
                            if (dropdown) {
                                if (item.classList.contains('active')) {
                                    dropdown.style.display = 'grid';

                                    // Don't move the text to the right
                                    const linkText = newLink.textContent.trim();
                                    newLink.style.transform = 'translateX(0)';

                                    // Scroll to make the dropdown visible if needed
                                    setTimeout(() => {
                                        const rect = dropdown.getBoundingClientRect();
                                        if (rect.bottom > window.innerHeight) {
                                            item.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }, 100);
                                } else {
                                    dropdown.style.display = 'none';
                                    newLink.style.transform = 'translateX(0)';
                                }
                            }
                        }
                    });
                }
            });
        }
    }

    // Call the function initially
    setupMobileDropdowns();

    // Also call it on window resize
    window.addEventListener('resize', function() {
        setupMobileDropdowns();
    });

    // Handle search form submission for both desktop and mobile
    const searchForms = document.querySelectorAll('.search-form');
    if (searchForms.length) {
        searchForms.forEach(form => {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const searchInput = form.querySelector('.search-box');
                const searchTerm = searchInput.value.trim();

                if (searchTerm) {
                    // Implement search functionality here
                    console.log('Searching for:', searchTerm);

                    // For demo purposes, redirect to all-tools.html with search parameter
                    window.location.href = `all-tools.html?search=${encodeURIComponent(searchTerm)}`;
                }
            });
        });
    }

    // Initialize search dropdowns for all pages
    function initSearchDropdowns() {
        // Handle desktop search in index.html
        const desktopSearchInput = document.getElementById('desktop-search-input');
        const desktopSearchDropdown = document.getElementById('desktop-search-dropdown');

        // Handle desktop search in all-tools.html
        const desktopSearchInputAll = document.getElementById('desktop-search-input-all');
        const desktopSearchDropdownAll = document.getElementById('desktop-search-dropdown-all');

        // Handle desktop search in popular-tools.html
        const desktopSearchInputPopular = document.getElementById('desktop-search-input-popular');
        const desktopSearchDropdownPopular = document.getElementById('desktop-search-dropdown-popular');

        // Handle mobile search in index.html
        const mobileSearchInput = document.getElementById('mobile-search-input');
        const mobileSearchDropdown = document.getElementById('mobile-search-dropdown');

        // Handle mobile search in all-tools.html
        const mobileSearchInputAll = document.getElementById('mobile-search-input-all');
        const mobileSearchDropdownAll = document.getElementById('mobile-search-dropdown-all');

        // Handle mobile search in popular-tools.html
        const mobileSearchInputPopular = document.getElementById('mobile-search-input-popular');
        const mobileSearchDropdownPopular = document.getElementById('mobile-search-dropdown-popular');

        // Setup desktop search in index.html
        if (desktopSearchInput && desktopSearchDropdown) {
            setupSearchDropdown(desktopSearchInput, desktopSearchDropdown);
        }

        // Setup desktop search in all-tools.html
        if (desktopSearchInputAll && desktopSearchDropdownAll) {
            setupSearchDropdown(desktopSearchInputAll, desktopSearchDropdownAll);
        }

        // Setup desktop search in popular-tools.html
        if (desktopSearchInputPopular && desktopSearchDropdownPopular) {
            setupSearchDropdown(desktopSearchInputPopular, desktopSearchDropdownPopular);
        }

        // Setup mobile search in index.html
        if (mobileSearchInput && mobileSearchDropdown) {
            setupSearchDropdown(mobileSearchInput, mobileSearchDropdown);
        }

        // Setup mobile search in all-tools.html
        if (mobileSearchInputAll && mobileSearchDropdownAll) {
            setupSearchDropdown(mobileSearchInputAll, mobileSearchDropdownAll);
        }

        // Setup mobile search in popular-tools.html
        if (mobileSearchInputPopular && mobileSearchDropdownPopular) {
            setupSearchDropdown(mobileSearchInputPopular, mobileSearchDropdownPopular);
        }
    }

    // Helper function to setup search dropdown behavior
    function setupSearchDropdown(input, dropdown) {
        input.addEventListener('focus', function() {
            dropdown.style.display = 'block';
        });

        input.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            if (searchTerm) {
                dropdown.style.display = 'block';
                // Filter search results based on searchTerm
                // This would be implemented with actual search logic
            } else {
                dropdown.style.display = 'block';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!input.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.style.display = 'none';
            }
        });
    }

    // Initialize search dropdowns
    initSearchDropdowns();
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
