/**
 * Search Functionality
 * Handles search dropdown and filtering
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize search functionality
    initSearch();
});

/**
 * Initialize search functionality
 */
function initSearch() {
    // Desktop search
    const desktopSearchInput = document.getElementById('desktop-search-input');
    const desktopSearchDropdown = document.getElementById('desktop-search-dropdown');

    // Mobile search
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchDropdown = document.getElementById('mobile-search-dropdown');

    // Sample tools data (in a real application, this would come from a database or API)
    const toolsData = [
        // Text Tools
        {
            id: 'outline-notepad',
            name: 'Outline Notepad',
            description: 'Take notes quickly with auto-save',
            category: 'Text Tools',
            icon: 'edit_note.svg',
            isPopular: true
        },
        {
            id: 'word-counter',
            name: 'Word Counter',
            description: 'Count words, characters, and paragraphs in your text',
            category: 'Text Tools',
            icon: 'format_list_numbered.svg',
            isPopular: true
        },
        {
            id: 'text-diff-highlighter',
            name: 'Text Diff Highlighter',
            description: 'Compare two texts and highlight the differences',
            category: 'Text Tools',
            icon: 'compare_arrows.svg',
            isPopular: false
        },
        {
            id: 'markdown-editor',
            name: 'Markdown Editor',
            description: 'Write and preview Markdown with syntax highlighting',
            category: 'Text Tools',
            icon: 'code.svg',
            isPopular: true
        },
        {
            id: 'case-converter',
            name: 'Case Converter',
            description: 'Convert text between different cases',
            category: 'Text Tools',
            icon: 'text_fields.svg',
            isPopular: false
        },
        {
            id: 'lorem-ipsum-generator',
            name: 'Lorem Ipsum Generator',
            description: 'Generate placeholder text for designs',
            category: 'Text Tools',
            icon: 'format_align_left.svg',
            isPopular: false
        },
        {
            id: 'format-checker',
            name: 'Format Checker',
            description: 'Check and validate text formatting',
            category: 'Text Tools',
            icon: 'check_circle.svg',
            isPopular: false
        },

        // File Tools
        {
            id: 'file-compressor',
            name: 'File Compressor',
            description: 'Compress files to reduce size',
            category: 'File Tools',
            icon: 'compress.svg',
            isPopular: true
        },
        {
            id: 'pdf-converter',
            name: 'PDF Converter',
            description: 'Convert documents to and from PDF',
            category: 'File Tools',
            icon: 'picture_as_pdf.svg',
            isPopular: true
        },

        // Image Tools
        {
            id: 'image-resizer',
            name: 'Image Resizer',
            description: 'Resize, crop, and optimize images',
            category: 'Image Tools',
            icon: 'crop.svg',
            isPopular: true
        },
        {
            id: 'meme-generator',
            name: 'Meme Generator',
            description: 'Create custom memes with your own images and text',
            category: 'Image Tools',
            icon: 'sentiment_very_satisfied.svg',
            isPopular: true
        },
        {
            id: 'image-editor',
            name: 'Image Editor',
            description: 'Edit images with filters and effects',
            category: 'Image Tools',
            icon: 'photo_filter.svg',
            isPopular: true
        },
        {
            id: 'image-converter',
            name: 'Image Converter',
            description: 'Convert images between formats',
            category: 'Image Tools',
            icon: 'swap_horiz.svg',
            isPopular: false
        },
        {
            id: 'image-compressor',
            name: 'Image Compressor',
            description: 'Compress images to reduce file size',
            category: 'Image Tools',
            icon: 'compress.svg',
            isPopular: false
        },
        {
            id: 'background-remover',
            name: 'Background Remover',
            description: 'Remove backgrounds from images automatically',
            category: 'Image Tools',
            icon: 'auto_fix_high.svg',
            isPopular: true
        },
        {
            id: 'wallpaper-ai',
            name: 'WallpaperAI',
            description: 'Generate custom wallpapers using AI',
            category: 'Image Tools',
            icon: 'wallpaper.svg',
            isPopular: false
        },

        // Utility Tools
        {
            id: 'password-generator',
            name: 'Password Generator',
            description: 'Create strong, secure passwords',
            category: 'Utility Tools',
            icon: 'password.svg',
            isPopular: true
        },
        {
            id: 'qr-code-generator',
            name: 'QR Code Generator',
            description: 'Create QR codes for URLs, text, and more',
            category: 'Utility Tools',
            icon: 'qr_code.svg',
            isPopular: true
        },
        {
            id: 'unit-converter',
            name: 'Unit Converter',
            description: 'Convert between different units of measurement',
            category: 'Utility Tools',
            icon: 'swap_vert.svg',
            isPopular: true
        },
        {
            id: 'password-checker',
            name: 'Password Checker',
            description: 'Check the strength and security of your passwords',
            category: 'Utility Tools',
            icon: 'security.svg',
            isPopular: false
        },
        {
            id: 'ascii-table',
            name: 'ASCII Table',
            description: 'View and search the complete ASCII character table',
            category: 'Utility Tools',
            icon: 'table_chart.svg',
            isPopular: false
        },
        {
            id: 'date-duration-calculator',
            name: 'Date Duration Calculator',
            description: 'Calculate the duration between two dates',
            category: 'Utility Tools',
            icon: 'date_range.svg',
            isPopular: false
        },

        // Developer Tools
        {
            id: 'json-formatter',
            name: 'JSON Formatter',
            description: 'Format, validate, and beautify JSON data',
            category: 'Developer Tools',
            icon: 'data_object.svg',
            isPopular: true
        },
        {
            id: 'regex-tester',
            name: 'Regex Tester',
            description: 'Test and debug regular expressions',
            category: 'Developer Tools',
            icon: 'find_replace.svg',
            isPopular: true
        },
        {
            id: 'code-beautifier',
            name: 'Code Beautifier',
            description: 'Format and beautify code in various languages',
            category: 'Developer Tools',
            icon: 'format_align_left.svg',
            isPopular: true
        },
        {
            id: 'html-minifier',
            name: 'HTML Minifier',
            description: 'Minify HTML code to reduce file size',
            category: 'Developer Tools',
            icon: 'compress.svg',
            isPopular: false
        },
        {
            id: 'css-minifier',
            name: 'CSS Minifier',
            description: 'Minify CSS code to reduce file size',
            category: 'Developer Tools',
            icon: 'compress.svg',
            isPopular: false
        },
        {
            id: 'javascript-minifier',
            name: 'JavaScript Minifier',
            description: 'Minify JavaScript code to reduce file size',
            category: 'Developer Tools',
            icon: 'compress.svg',
            isPopular: false
        },
        {
            id: 'sql-formatter',
            name: 'SQL Formatter',
            description: 'Format and beautify SQL queries',
            category: 'Developer Tools',
            icon: 'storage.svg',
            isPopular: false
        },
        {
            id: 'json-reformatter',
            name: 'JSON Reformatter',
            description: 'Reformat and restructure JSON data',
            category: 'Developer Tools',
            icon: 'data_object.svg',
            isPopular: false
        },
        {
            id: 'css-grid-generator',
            name: 'CSS Grid Generator',
            description: 'Generate CSS grid layouts visually',
            category: 'Developer Tools',
            icon: 'grid_view.svg',
            isPopular: false
        },

        // Productivity Tools
        {
            id: 'pomodoro-timer',
            name: 'Pomodoro Timer',
            description: 'Boost productivity with timed work sessions',
            category: 'Productivity Tools',
            icon: 'timer.svg',
            isPopular: true
        },
        {
            id: 'calendar-planner',
            name: 'Calendar Planner',
            description: 'Plan your schedule with an intuitive calendar',
            category: 'Productivity Tools',
            icon: 'calendar_today.svg',
            isPopular: true
        },
        {
            id: 'todo-list',
            name: 'Todo List',
            description: 'Manage your tasks effectively',
            category: 'Productivity Tools',
            icon: 'checklist.svg',
            isPopular: true
        },
        {
            id: 'habit-tracker',
            name: 'Habit Tracker',
            description: 'Track and build habits with visual indicators',
            category: 'Productivity Tools',
            icon: 'trending_up.svg',
            isPopular: false
        },

        // Math Tools
        {
            id: 'grade-calculator',
            name: 'Grade Calculator',
            description: 'Calculate your final grade based on assignments',
            category: 'Math Tools',
            icon: 'grade.svg',
            isPopular: true
        },
        {
            id: 'gpa-calculator',
            name: 'GPA Calculator',
            description: 'Calculate your Grade Point Average',
            category: 'Math Tools',
            icon: 'school.svg',
            isPopular: true
        },

        // Financial Calculators
        {
            id: 'mortgage-calculator',
            name: 'Mortgage Calculator',
            description: 'Calculate mortgage payments and interest',
            category: 'Financial Calculators',
            icon: 'home.svg',
            isPopular: true
        },
        {
            id: 'compound-interest-calculator',
            name: 'Compound Interest Calculator',
            description: 'Calculate investment growth over time',
            category: 'Financial Calculators',
            icon: 'trending_up.svg',
            isPopular: true
        },

        // Health Calculators
        {
            id: 'bmi-calculator',
            name: 'BMI Calculator',
            description: 'Calculate your Body Mass Index',
            category: 'Health Calculators',
            icon: 'monitor_weight.svg',
            isPopular: true
        }
    ];

    // Handle desktop search
    if (desktopSearchInput && desktopSearchDropdown) {
        // Show dropdown on focus
        desktopSearchInput.addEventListener('focus', function() {
            desktopSearchDropdown.classList.add('show');
        });

        // Filter results as user types
        desktopSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            filterSearchResults(searchTerm, desktopSearchDropdown, toolsData);
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!desktopSearchInput.contains(event.target) && !desktopSearchDropdown.contains(event.target)) {
                desktopSearchDropdown.classList.remove('show');
            }
        });
    }

    // Handle mobile search
    if (mobileSearchInput && mobileSearchDropdown) {
        // Show dropdown on focus
        mobileSearchInput.addEventListener('focus', function() {
            mobileSearchDropdown.classList.add('show');
        });

        // Filter results as user types
        mobileSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            filterSearchResults(searchTerm, mobileSearchDropdown, toolsData);
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileSearchInput.contains(event.target) && !mobileSearchDropdown.contains(event.target)) {
                mobileSearchDropdown.classList.remove('show');
            }
        });
    }
}

/**
 * Filter search results based on search term
 * @param {string} searchTerm - The search term
 * @param {HTMLElement} dropdownElement - The dropdown element to update
 * @param {Array} toolsData - The tools data to filter
 */
function filterSearchResults(searchTerm, dropdownElement, toolsData) {
    if (!searchTerm) {
        // If search term is empty, show default categories
        showDefaultCategories(dropdownElement, toolsData);
        return;
    }

    // Filter tools based on search term
    const filteredTools = toolsData.filter(tool => {
        return tool.name.toLowerCase().includes(searchTerm) ||
               tool.description.toLowerCase().includes(searchTerm) ||
               tool.category.toLowerCase().includes(searchTerm);
    });

    if (filteredTools.length === 0) {
        // No results found
        dropdownElement.innerHTML = `
            <div class="search-no-results">
                <p>No tools found matching "${searchTerm}"</p>
            </div>
        `;
        return;
    }

    // Group results by category
    const groupedResults = groupByCategory(filteredTools);

    // Build HTML for search results
    let resultsHTML = '';

    // Add recommended tools first (if any)
    const recommendedTools = filteredTools.filter(tool => tool.isPopular);
    if (recommendedTools.length > 0) {
        resultsHTML += `
            <div class="search-category">
                <h5>Recommended Results</h5>
                <div class="search-results">
                    ${recommendedTools.map(tool => createToolItemHTML(tool)).join('')}
                </div>
            </div>
        `;
    }

    // Add other results grouped by category
    Object.keys(groupedResults).forEach(category => {
        resultsHTML += `
            <div class="search-category">
                <h5>${category}</h5>
                <div class="search-results">
                    ${groupedResults[category].map(tool => createToolItemHTML(tool)).join('')}
                </div>
            </div>
        `;
    });

    // Update dropdown content
    dropdownElement.innerHTML = resultsHTML;
}

/**
 * Show default categories in the search dropdown
 * @param {HTMLElement} dropdownElement - The dropdown element to update
 * @param {Array} toolsData - The tools data
 */
function showDefaultCategories(dropdownElement, toolsData) {
    // Get popular tools
    const popularTools = toolsData.filter(tool => tool.isPopular);

    // Get unique categories
    const categories = [...new Set(toolsData.map(tool => tool.category))];

    // Build HTML
    let html = `
        <div class="search-category">
            <h5>Recommended Tools</h5>
            <div class="search-results">
                ${popularTools.map(tool => createToolItemHTML(tool)).join('')}
            </div>
        </div>
        <div class="search-category">
            <h5>Categories</h5>
            <div class="search-results">
                ${categories.map(category => `
                    <a href="#" class="search-result-item">
                        <div class="search-result-info">
                            <div class="search-result-title">${category}</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        </div>
    `;

    // Update dropdown content
    dropdownElement.innerHTML = html;
}

/**
 * Group tools by category
 * @param {Array} tools - The tools to group
 * @returns {Object} - Object with categories as keys and arrays of tools as values
 */
function groupByCategory(tools) {
    return tools.reduce((acc, tool) => {
        if (!acc[tool.category]) {
            acc[tool.category] = [];
        }
        acc[tool.category].push(tool);
        return acc;
    }, {});
}

/**
 * Create HTML for a tool item
 * @param {Object} tool - The tool data
 * @returns {string} - HTML for the tool item
 */
function createToolItemHTML(tool) {
    return `
        <a href="#${tool.id}" class="search-result-item">
            <div class="search-result-icon">
                <img src="assets/images/tool-icons/${tool.icon}" alt="${tool.name} Icon" width="24" height="24">
            </div>
            <div class="search-result-info">
                <div class="search-result-title">
                    ${tool.name} ${tool.isPopular ? '<span class="recommended-label">Popular</span>' : ''}
                </div>
                <div class="search-result-description">${tool.description}</div>
            </div>
        </a>
    `;
}
