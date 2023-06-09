window.addEventListener('load', () => {
    let tasks = [];
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const listElements = document.querySelector("#tasks");
    const taskCounter = document.querySelector('#task-counter');
    const noTask = document.getElementById('no-tasks');
    const completeTasks = document.getElementById('ct-counter');
    const uncompleteTasks = document.getElementById('uct-counter');
    const markAllComplete = document.getElementById('mark-all-as-complete');
    const clearCompleted = document.getElementById('clear-completed');

    // Update tasks in local storage
    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Fetch tasks from local storage and update tasks array
    const fetchTasksFromLocalStorage = () => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    };

    // Render tasks on the page
    const renderTasks = () => {
        listElements.innerHTML = ''; // Clear the list before rendering
        if (tasks.length > 0) {
            noTask.style.display = 'none';
            taskCounter.innerHTML = tasks.length;

            // Iterate over the task and show the list
            tasks.forEach(taskObj => {
                const taskElement = document.createElement('div');
                taskElement.classList.add('task');
                taskElement.setAttribute('id', taskObj.id);

                const taskContent = document.createElement('div');
                taskContent.classList.add('content');

                taskElement.appendChild(taskContent);

                const taskCheckbox = document.createElement('input');
                taskCheckbox.type = 'checkbox';
                taskCheckbox.classList.add('custom-checkbox');
                taskCheckbox.setAttribute('id', taskObj.id);
                taskCheckbox.checked = taskObj.completed; // Set the checkbox checked status based on taskObj.completed value
                taskContent.appendChild(taskCheckbox);

                const taskInput = document.createElement('input');
                taskInput.classList.add('text');
                taskInput.type = 'text';
                taskInput.value = taskObj.title;
                taskInput.setAttribute('readonly', 'readonly');

                taskContent.appendChild(taskInput);

                const taskActions = document.createElement('div');
                taskActions.classList.add('actions');

                const taskEdit = document.createElement('button');
                taskEdit.classList.add('edit');
                taskEdit.innerText = 'Edit';

                const taskDelete = document.createElement('button');
                taskDelete.classList.add('delete');
                taskDelete.innerText = 'delete';

                taskActions.appendChild(taskEdit);
                taskActions.appendChild(taskDelete);

                taskElement.appendChild(taskActions);

                listElements.appendChild(taskElement);

                // Edit task event 
                taskEdit.addEventListener('click', (e) => {
                    if (taskEdit.innerText.toLowerCase() == "edit") {
                        taskEdit.innerText = "Save";
                        taskInput.removeAttribute("readonly");
                        taskInput.focus();
                    } else {
                        const elementId = taskElement.getAttribute('id');
                        const editedTitle = taskInput.value;
                        const editedTask = tasks.find(task => task.id === Number(elementId));
                        editedTask.title = editedTitle; // Update the title of the edited task

                        taskEdit.innerText = "Edit";
                        taskEdit.setAttribute("readonly", "readonly");
                        updateLocalStorage(); // Update local storage with the edited task title
                        renderTasks();
                    }
                });

                // Delete task event
                taskDelete.addEventListener('click', (e) => {
                    const removedElementId = taskElement.getAttribute('id');
                    listElements.removeChild(taskElement);
                    const newTasks = tasks.filter(task => task.id !== Number(removedElementId));
                    tasks = newTasks;
                    taskCounter.innerHTML = tasks.length;
                    updateLocalStorage();

                    // Status of the tasks
                    taskStatus();

                    if (tasks.length === 0) {
                        noTask.style.display = 'block';
                        markAllComplete.style.display = 'none';
                        clearCompleted.style.display = 'none';
                    }
                });

                // Mark as complete or un complete event 
                taskCheckbox.addEventListener('click', (e) => {
                    const elementId = taskElement.getAttribute('id');
                    const task = tasks.find(task => task.id === Number(elementId));
                    task.completed = !task.completed;

                    if (!taskCheckbox.checked) {
                        taskEdit.style.display = 'block';
                    } else {
                        taskEdit.style.display = 'none';
                    }
                    updateLocalStorage(); // Update local storage after modifying the task object

                    // Status of the tasks
                    taskStatus();
                });

                // When all tasks marked as completed
                if (taskObj.completed === true) {
                    taskEdit.style.display = 'none';
                }

            });
        };
    };



    // Status of the tasks
    const taskStatus = () => {
        const allCompleted = tasks.filter((task) => {
            return task.completed === true;
        });
        completeTasks.innerHTML = allCompleted.length;
        if (tasks.length < allCompleted.length) {
            uncompleteTasks.innerHTML = allCompleted.length - tasks.length;
        } else {
            uncompleteTasks.innerHTML = tasks.length - allCompleted.length;
        };
    }

    // Create list of input by submit the form
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value.trim() !== '') {
            const newTask = {
                id: tasks.length + 1,
                title: input.value.trim(),
                completed: false
            };
            tasks.push(newTask);
            updateLocalStorage();
            renderTasks();
            taskStatus();
            input.value = ''; // Clear input field
            markAllComplete.style.display = 'block';
            clearCompleted.style.display = 'block';
        } else {
            alert("Please write something to add");
        }
    });

    // Mark all tasks as completed
    markAllComplete.addEventListener('click', () => {
        tasks.forEach(task => {
            task.completed = !task.completed;
        });

        updateLocalStorage();
        renderTasks();
        taskStatus();

    });

    // Clear all completed tasks
    clearCompleted.addEventListener('click', () => {
        tasks = tasks.filter(task => {
            return task.completed === false;
        });
        taskCounter.innerHTML = tasks.length;
        if (tasks.length === 0) {
            markAllComplete.style.display = 'none';
            clearCompleted.style.display = 'none';
            noTask.style.display = 'block';
        }
        updateLocalStorage();
        renderTasks();
        taskStatus();
    });

    // Initialization
    fetchTasksFromLocalStorage();
    renderTasks();
    taskStatus();

    // Additional buttons should be removed if no tasks
    if (tasks.length === 0) {
        markAllComplete.style.display = 'none';
        clearCompleted.style.display = 'none';
    };

});
