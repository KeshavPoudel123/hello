/**
 * Tools Filter JavaScript
 * Handles category filtering and search functionality for the All Tools page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize category filters
    initCategoryFilters();
    
    // Check for search parameter in URL
    handleSearchParam();
});

/**
 * Initializes the category filter buttons
 */
function initCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const toolCards = document.querySelectorAll('.tool-card');
    
    if (!filterButtons.length || !toolCards.length) return;
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter tools
            filterTools(selectedCategory, toolCards);
        });
    });
}

/**
 * Filters tool cards based on selected category
 * @param {string} category - The category to filter by
 * @param {NodeList} toolCards - The collection of tool cards
 */
function filterTools(category, toolCards) {
    toolCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = '';
            // Add animation class
            card.classList.add('fade-in');
            setTimeout(() => {
                card.classList.remove('fade-in');
            }, 500);
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Checks for search parameter in URL and filters tools accordingly
 */
function handleSearchParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        // Display search term
        const pageHeader = document.querySelector('.page-header .subtitle');
        if (pageHeader) {
            pageHeader.textContent = `Search results for: "${searchTerm}"`;
        }
        
        // Filter tools based on search term
        searchTools(searchTerm);
    }
}

/**
 * Searches tools based on search term
 * @param {string} searchTerm - The term to search for
 */
function searchTools(searchTerm) {
    const toolCards = document.querySelectorAll('.tool-card');
    const filterButtons = document.querySelectorAll('.category-filter');
    const searchLower = searchTerm.toLowerCase();
    let matchFound = false;
    
    // Reset category filters
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filter tools based on search term
    toolCards.forEach(card => {
        const toolName = card.querySelector('h3').textContent.toLowerCase();
        const toolDescription = card.querySelector('p').textContent.toLowerCase();
        
        if (toolName.includes(searchLower) || toolDescription.includes(searchLower)) {
            card.style.display = '';
            card.classList.add('search-match');
            matchFound = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no matches found
    const toolsGrid = document.getElementById('tools-grid');
    const existingMessage = document.querySelector('.no-results-message');
    
    if (!matchFound) {
        if (!existingMessage) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results-message';
            noResultsMessage.innerHTML = `
                <h3>No tools found</h3>
                <p>No tools match your search term "${searchTerm}". Try a different search term or browse all tools.</p>
            `;
            toolsGrid.appendChild(noResultsMessage);
        }
    } else if (existingMessage) {
        existingMessage.remove();
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .tool-card {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease forwards;
    }
    
    .search-match {
        animation: highlight 1s ease;
    }
    
    .no-results-message {
        text-align: center;
        padding: 2rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        margin: 2rem 0;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes highlight {
        0%, 100% {
            background-color: transparent;
        }
        50% {
            background-color: rgba(0, 196, 204, 0.1);
        }
    }
`;
document.head.appendChild(style);
