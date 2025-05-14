/**
 * Tool Template JavaScript
 * Common functionality for all tool pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize share functionality
    initShareButton();
    
    // Initialize notification system
    initNotificationSystem();
    
    // Update copyright year
    updateCopyrightYear();
    
    // Load similar tools
    loadSimilarTools();
});

/**
 * Initialize share button functionality
 */
function initShareButton() {
    const shareBtn = document.getElementById('share-btn');
    const shareDropdown = document.getElementById('share-dropdown');
    
    if (!shareBtn || !shareDropdown) return;
    
    // Toggle share dropdown
    shareBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        shareDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!shareBtn.contains(event.target) && !shareDropdown.contains(event.target)) {
            shareDropdown.classList.remove('show');
        }
    });
    
    // Share on Facebook
    document.getElementById('share-facebook').addEventListener('click', function(e) {
        e.preventDefault();
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, '_blank');
        showNotification('Sharing on Facebook', 'Opening Facebook sharing dialog...', 'info');
    });
    
    // Share on Twitter
    document.getElementById('share-twitter').addEventListener('click', function(e) {
        e.preventDefault();
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        showNotification('Sharing on Twitter', 'Opening Twitter sharing dialog...', 'info');
    });
    
    // Share on LinkedIn
    document.getElementById('share-linkedin').addEventListener('click', function(e) {
        e.preventDefault();
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        showNotification('Sharing on LinkedIn', 'Opening LinkedIn sharing dialog...', 'info');
    });
    
    // Share via Email
    document.getElementById('share-email').addEventListener('click', function(e) {
        e.preventDefault();
        const url = window.location.href;
        const title = document.title;
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this tool: ' + url)}`;
        showNotification('Sharing via Email', 'Opening your email client...', 'info');
    });
    
    // Copy link
    document.getElementById('copy-link').addEventListener('click', function(e) {
        e.preventDefault();
        const url = window.location.href;
        
        // Use Clipboard API if available
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url)
                .then(() => {
                    showNotification('Link Copied', 'The link has been copied to your clipboard.', 'success');
                })
                .catch(err => {
                    showNotification('Copy Failed', 'Could not copy the link. Please try again.', 'error');
                    console.error('Could not copy text: ', err);
                });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = url;
            textarea.style.position = 'fixed';  // Prevent scrolling to bottom
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showNotification('Link Copied', 'The link has been copied to your clipboard.', 'success');
                } else {
                    showNotification('Copy Failed', 'Could not copy the link. Please try again.', 'error');
                }
            } catch (err) {
                showNotification('Copy Failed', 'Could not copy the link. Please try again.', 'error');
                console.error('Could not copy text: ', err);
            }
            
            document.body.removeChild(textarea);
        }
        
        // Hide dropdown after copying
        shareDropdown.classList.remove('show');
    });
}

/**
 * Initialize Apple-style notification system
 */
function initNotificationSystem() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

/**
 * Show a notification
 * @param {string} title - The notification title
 * @param {string} message - The notification message
 * @param {string} type - The notification type (success, error, info, warning)
 * @param {number} duration - How long to show the notification in ms (default: 4000)
 */
function showNotification(title, message, type = 'info', duration = 4000) {
    const container = document.getElementById('notification-container');
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Get icon based on type
    let iconSvg;
    switch (type) {
        case 'success':
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
            break;
        case 'error':
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
            break;
        case 'warning':
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
            break;
        case 'info':
        default:
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
            break;
    }
    
    // Set notification content
    notification.innerHTML = `
        <div class="notification-icon">${iconSvg}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <p class="notification-message">${message}</p>
        </div>
        <button class="notification-close" aria-label="Close notification">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto-close after duration
    const timeout = setTimeout(() => {
        closeNotification(notification);
    }, duration);
    
    // Store timeout ID on the element
    notification.dataset.timeoutId = timeout;
    
    return notification;
}

/**
 * Close a notification
 * @param {HTMLElement} notification - The notification element to close
 */
function closeNotification(notification) {
    // Clear timeout if it exists
    if (notification.dataset.timeoutId) {
        clearTimeout(parseInt(notification.dataset.timeoutId));
    }
    
    // Remove show class to trigger fade out animation
    notification.classList.remove('show');
    
    // Remove element after animation completes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

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
 * Load similar tools based on current tool category
 * In a real implementation, this would fetch from an API or database
 */
function loadSimilarTools() {
    // This is a placeholder function
    // In a real implementation, you would:
    // 1. Determine the current tool's category
    // 2. Fetch other tools in the same category
    // 3. Update the similar-tools-grid with the fetched tools
    
    // For demonstration, we'll just show a notification
    // that this would normally load dynamically
    setTimeout(() => {
        showNotification('Similar Tools', 'Similar tools would be loaded dynamically based on the current tool category.', 'info', 5000);
    }, 2000);
}

/**
 * Save data to localStorage with expiration
 * @param {string} key - The key to store the data under
 * @param {any} value - The value to store
 * @param {number} expirationInMinutes - How long to store the data (in minutes)
 */
function saveToLocalStorage(key, value, expirationInMinutes = 1440) { // Default: 1 day
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + (expirationInMinutes * 60 * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
}

/**
 * Get data from localStorage, checking for expiration
 * @param {string} key - The key to retrieve
 * @returns {any|null} - The stored value or null if expired/not found
 */
function getFromLocalStorage(key) {
    const itemStr = localStorage.getItem(key);
    
    // Return null if no item found
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    // Return null if expired
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    
    return item.value;
}

/**
 * Format a date in a user-friendly way
 * @param {Date|string} date - The date to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in ms
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
