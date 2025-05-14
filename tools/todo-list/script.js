/**
 * Todo List Tool JavaScript
 * Implements Apple-like UI and functionality for the Todo List tool
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Todo List
    initTodoList();
});

/**
 * Initialize Todo List functionality
 */
function initTodoList() {
    // DOM Elements
    const addTaskBtn = document.getElementById('add-task-btn');
    const addTaskModal = document.getElementById('add-task-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelAddTaskBtn = document.getElementById('cancel-add-task');
    const addTaskForm = document.getElementById('add-task-form');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    const taskCountElement = document.getElementById('task-count');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Edit Task Modal Elements
    const editTaskModal = document.getElementById('edit-task-modal');
    const closeEditModalBtn = document.getElementById('close-edit-modal');
    const cancelEditTaskBtn = document.getElementById('cancel-edit-task');
    const editTaskForm = document.getElementById('edit-task-form');
    const deleteTaskBtn = document.getElementById('delete-task');
    
    // Current filter
    let currentFilter = 'all';
    
    // Load tasks from localStorage
    let tasks = loadTasks();
    
    // Render initial tasks
    renderTasks();
    updateTaskCount();
    
    // Add Task Button Click
    addTaskBtn.addEventListener('click', function() {
        showModal(addTaskModal);
    });
    
    // Close Add Task Modal
    closeModalBtn.addEventListener('click', function() {
        hideModal(addTaskModal);
    });
    
    // Cancel Add Task
    cancelAddTaskBtn.addEventListener('click', function() {
        hideModal(addTaskModal);
    });
    
    // Add Task Form Submit
    addTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value.trim();
        const description = document.getElementById('task-description').value.trim();
        const dueDate = document.getElementById('task-due-date').value;
        const priority = document.getElementById('task-priority').value;
        
        if (title) {
            const newTask = {
                id: generateId(),
                title: title,
                description: description,
                dueDate: dueDate,
                priority: priority,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            // Add task to array
            tasks.push(newTask);
            
            // Save to localStorage
            saveTasks();
            
            // Render tasks
            renderTasks();
            updateTaskCount();
            
            // Reset form and hide modal
            addTaskForm.reset();
            hideModal(addTaskModal);
            
            // Show notification
            showNotification('Task Added', `"${title}" has been added to your tasks.`, 'success');
        }
    });
    
    // Close Edit Task Modal
    closeEditModalBtn.addEventListener('click', function() {
        hideModal(editTaskModal);
    });
    
    // Cancel Edit Task
    cancelEditTaskBtn.addEventListener('click', function() {
        hideModal(editTaskModal);
    });
    
    // Edit Task Form Submit
    editTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const taskId = document.getElementById('edit-task-id').value;
        const title = document.getElementById('edit-task-title').value.trim();
        const description = document.getElementById('edit-task-description').value.trim();
        const dueDate = document.getElementById('edit-task-due-date').value;
        const priority = document.getElementById('edit-task-priority').value;
        
        if (title) {
            // Find task index
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            
            if (taskIndex !== -1) {
                // Update task
                tasks[taskIndex].title = title;
                tasks[taskIndex].description = description;
                tasks[taskIndex].dueDate = dueDate;
                tasks[taskIndex].priority = priority;
                
                // Save to localStorage
                saveTasks();
                
                // Render tasks
                renderTasks();
                
                // Hide modal
                hideModal(editTaskModal);
                
                // Show notification
                showNotification('Task Updated', `"${title}" has been updated.`, 'success');
            }
        }
    });
    
    // Delete Task
    deleteTaskBtn.addEventListener('click', function() {
        const taskId = document.getElementById('edit-task-id').value;
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
            const taskTitle = tasks[taskIndex].title;
            
            // Remove task
            tasks.splice(taskIndex, 1);
            
            // Save to localStorage
            saveTasks();
            
            // Render tasks
            renderTasks();
            updateTaskCount();
            
            // Hide modal
            hideModal(editTaskModal);
            
            // Show notification
            showNotification('Task Deleted', `"${taskTitle}" has been deleted.`, 'info');
        }
    });
    
    // Filter Buttons Click
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set current filter
            currentFilter = this.getAttribute('data-filter');
            
            // Render tasks with filter
            renderTasks();
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === addTaskModal) {
            hideModal(addTaskModal);
        }
        if (event.target === editTaskModal) {
            hideModal(editTaskModal);
        }
    });
    
    /**
     * Render tasks based on current filter
     */
    function renderTasks() {
        // Clear todo list
        while (todoList.firstChild) {
            if (todoList.firstChild !== emptyState) {
                todoList.removeChild(todoList.firstChild);
            }
        }
        
        // Filter tasks
        let filteredTasks = tasks;
        
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        // Sort tasks: incomplete first, then by priority (high to low), then by due date
        filteredTasks.sort((a, b) => {
            // Completed tasks go to the bottom
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            
            // Sort by priority for incomplete tasks
            if (!a.completed && !b.completed) {
                const priorityOrder = { high: 1, medium: 2, low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            
            // Sort by due date if both have due dates
            if (a.dueDate && b.dueDate) {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            
            // Tasks with due dates come before tasks without due dates
            if (a.dueDate && !b.dueDate) return -1;
            if (!a.dueDate && b.dueDate) return 1;
            
            // Sort by creation date (newest first) if all else is equal
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        // Show empty state if no tasks
        if (filteredTasks.length === 0) {
            emptyState.style.display = 'flex';
        } else {
            emptyState.style.display = 'none';
            
            // Render each task
            filteredTasks.forEach(task => {
                const taskElement = createTaskElement(task);
                todoList.appendChild(taskElement);
            });
        }
    }
    
    /**
     * Create a task element
     * @param {Object} task - The task object
     * @returns {HTMLElement} - The task element
     */
    function createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskElement.setAttribute('data-id', task.id);
        
        // Create checkbox
        const checkbox = document.createElement('div');
        checkbox.className = 'task-checkbox';
        checkbox.innerHTML = `
            <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
            <label for="task-${task.id}"></label>
        `;
        
        // Create task content
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        
        // Task title
        const taskTitle = document.createElement('h3');
        taskTitle.className = 'task-title';
        taskTitle.textContent = task.title;
        
        // Task description (if any)
        let taskDescription = '';
        if (task.description) {
            taskDescription = `<p class="task-description">${task.description}</p>`;
        }
        
        // Task meta information
        let taskMeta = '<div class="task-meta">';
        
        // Due date (if any)
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const isOverdue = dueDate < today && !task.completed;
            
            taskMeta += `
                <span class="task-due-date ${isOverdue ? 'overdue' : ''}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    ${formatDate(dueDate)}
                </span>
            `;
        }
        
        // Priority
        taskMeta += `<span class="task-priority ${task.priority}">${task.priority}</span>`;
        
        taskMeta += '</div>';
        
        // Set task content HTML
        taskContent.innerHTML = `
            ${taskTitle.outerHTML}
            ${taskDescription}
            ${taskMeta}
        `;
        
        // Append checkbox and content to task element
        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskContent);
        
        // Add event listeners
        
        // Toggle task completion
        const checkboxInput = taskElement.querySelector(`#task-${task.id}`);
        checkboxInput.addEventListener('change', function(e) {
            e.stopPropagation(); // Prevent opening edit modal
            
            // Update task completion status
            const taskId = taskElement.getAttribute('data-id');
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = this.checked;
                
                // Update UI
                if (this.checked) {
                    taskElement.classList.add('completed');
                } else {
                    taskElement.classList.remove('completed');
                }
                
                // Save to localStorage
                saveTasks();
                
                // Re-render if using a filter
                if (currentFilter !== 'all') {
                    setTimeout(() => {
                        renderTasks();
                    }, 300);
                }
                
                updateTaskCount();
                
                // Show notification
                const action = this.checked ? 'completed' : 'marked as incomplete';
                showNotification('Task Updated', `"${tasks[taskIndex].title}" ${action}.`, 'success');
            }
        });
        
        // Open edit modal when clicking on task
        taskElement.addEventListener('click', function(e) {
            // Don't open edit modal if clicking on checkbox
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
                return;
            }
            
            const taskId = this.getAttribute('data-id');
            const task = tasks.find(t => t.id === taskId);
            
            if (task) {
                // Populate edit form
                document.getElementById('edit-task-id').value = task.id;
                document.getElementById('edit-task-title').value = task.title;
                document.getElementById('edit-task-description').value = task.description || '';
                document.getElementById('edit-task-due-date').value = task.dueDate || '';
                document.getElementById('edit-task-priority').value = task.priority;
                
                // Show edit modal
                showModal(editTaskModal);
            }
        });
        
        return taskElement;
    }
    
    /**
     * Update task count display
     */
    function updateTaskCount() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const activeTasks = totalTasks - completedTasks;
        
        let countText = '';
        
        if (totalTasks === 0) {
            countText = 'No tasks';
        } else if (totalTasks === 1) {
            countText = '1 task';
        } else {
            countText = `${totalTasks} tasks`;
        }
        
        if (totalTasks > 0) {
            countText += ` • ${completedTasks} completed`;
        }
        
        taskCountElement.textContent = countText;
    }
    
    /**
     * Show a modal
     * @param {HTMLElement} modal - The modal element
     */
    function showModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
    }
    
    /**
     * Hide a modal
     * @param {HTMLElement} modal - The modal element
     */
    function hideModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    /**
     * Generate a unique ID
     * @returns {string} - A unique ID
     */
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
    
    /**
     * Format a date in a user-friendly way
     * @param {Date} date - The date to format
     * @returns {string} - Formatted date string
     */
    function formatDate(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Set hours to 0 for comparison
        const compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);
        
        if (compareDate.getTime() === today.getTime()) {
            return 'Today';
        } else if (compareDate.getTime() === tomorrow.getTime()) {
            return 'Tomorrow';
        } else if (compareDate.getTime() === yesterday.getTime()) {
            return 'Yesterday';
        } else {
            // Format as MM/DD/YYYY
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            
            return `${month}/${day}/${year}`;
        }
    }
    
    /**
     * Load tasks from localStorage
     * @returns {Array} - Array of tasks
     */
    function loadTasks() {
        const tasksJson = localStorage.getItem('todo-list-tasks');
        return tasksJson ? JSON.parse(tasksJson) : [];
    }
    
    /**
     * Save tasks to localStorage
     */
    function saveTasks() {
        localStorage.setItem('todo-list-tasks', JSON.stringify(tasks));
    }
}

// Create empty state SVG
document.addEventListener('DOMContentLoaded', function() {
    // Create SVG for empty state if it doesn't exist
    if (!document.querySelector('.empty-state-icon')) {
        const emptySvg = document.createElement('svg');
        emptySvg.setAttribute('class', 'empty-state-icon');
        emptySvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        emptySvg.setAttribute('viewBox', '0 0 24 24');
        emptySvg.setAttribute('fill', 'none');
        emptySvg.setAttribute('stroke', 'currentColor');
        emptySvg.setAttribute('stroke-width', '1');
        emptySvg.setAttribute('stroke-linecap', 'round');
        emptySvg.setAttribute('stroke-linejoin', 'round');
        
        // Create SVG content
        emptySvg.innerHTML = `
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="9"></line>
            <line x1="9" y1="12" x2="15" y2="12"></line>
            <line x1="9" y1="15" x2="13" y2="15"></line>
        `;
        
        // Replace the img element with the SVG
        const emptyStateIcon = document.querySelector('.empty-state-icon');
        if (emptyStateIcon && emptyStateIcon.parentNode) {
            emptyStateIcon.parentNode.replaceChild(emptySvg, emptyStateIcon);
        }
    }
});
