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
        {
            id: 'online-notepad',
            name: 'Online Notepad',
            description: 'Take notes quickly with auto-save',
            category: 'Document Tools',
            icon: 'notepad.svg',
            isPopular: true
        },
        {
            id: 'pdf-converter',
            name: 'PDF Converter',
            description: 'Convert documents to and from PDF',
            category: 'Document Tools',
            icon: 'pdf.svg',
            isPopular: true
        },
        {
            id: 'markdown-editor',
            name: 'Markdown Editor',
            description: 'Write and preview Markdown with syntax highlighting',
            category: 'Document Tools',
            icon: 'markdown.svg',
            isPopular: false
        },
        {
            id: 'image-editor',
            name: 'Image Editor',
            description: 'Edit images with filters and effects',
            category: 'Image Tools',
            icon: 'image.svg',
            isPopular: true
        },
        {
            id: 'color-palette',
            name: 'Color Palette Generator',
            description: 'Create beautiful color schemes',
            category: 'Image Tools',
            icon: 'palette.svg',
            isPopular: false
        },
        {
            id: 'code-formatter',
            name: 'Code Formatter',
            description: 'Format and beautify your code',
            category: 'Developer Tools',
            icon: 'code.svg',
            isPopular: true
        },
        {
            id: 'json-formatter',
            name: 'JSON Formatter',
            description: 'Format and validate JSON data',
            category: 'Developer Tools',
            icon: 'json.svg',
            isPopular: false
        },
        {
            id: 'password-generator',
            name: 'Password Generator',
            description: 'Create strong, secure passwords',
            category: 'Utility Tools',
            icon: 'password.svg',
            isPopular: true
        },
        {
            id: 'calculator',
            name: 'Advanced Calculator',
            description: 'Perform complex calculations',
            category: 'Utility Tools',
            icon: 'calculator.svg',
            isPopular: false
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
