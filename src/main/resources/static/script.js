// Function to fetch tasks from the server and display them
function fetchTasks() {
    fetch('http://localhost:8080/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = ''; // Clear current list

            // Loop through tasks and append to the list
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.innerHTML = `
          <h3>${task.title}</h3>
          <p><strong>Description:</strong> ${task.description}</p>
          <p><strong>Priority:</strong> ${task.priority}</p>
          <p><strong>Status:</strong> ${task.status ? 'Completed' : 'Pending'}</p>
        `;
                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

// Event listener for form submission
document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').checked;

    // Create a new task object
    const task = {
        title,
        description,
        priority,
        status
    };

    // Make POST request to create the task
    fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json())
        .then(newTask => {
            // After adding the task, clear the form and fetch tasks again to update the list
            document.getElementById('task-form').reset();
            fetchTasks();
        })
        .catch(error => console.error('Error adding task:', error));
});

// Fetch tasks when the page loads
window.onload = fetchTasks;
