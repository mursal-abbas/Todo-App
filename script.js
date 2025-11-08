// Get all elements from html to javascript //
const container = document.getElementById('container');
const inputEl = document.getElementById('input-el');
const buttonEl = document.getElementById('button-el');
const list = document.getElementById('list');

// Create button event listener to get input and save to local storage //
buttonEl.addEventListener('click', () => {
    const inputValue = inputEl.value.trim();
     if (!inputValue) return;
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newTask = {
        id: Date.now(),
        text: inputValue
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inputEl.value = "";
    renderTasks();
});

// Function to render tasks from local storage to the list //
function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    list.innerHTML = "";
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = "✅";
        completeBtn.classList.add('complete-btn');

        // When the complete button is clicked, remove the task from tasks //
        completeBtn.addEventListener('click', () => {
            // Remove from tasks
            const currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = currentTasks.filter(t => t.id !== task.id);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            // Re-render the list after changes
            renderTasks();

        });

        li.appendChild(completeBtn);
        list.appendChild(li);
    });
}

renderTasks()