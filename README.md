# TODO LIST -
    - Using HTML, CSS and javaScript.

# PAGE STRUCTURE : HTML -
    - We have a <!DOCTYPE html> declaration, indicating that this is an HTML5 document. The <html> tag represents the root element of the document, and the lang attribute is set to "en" to specify the language as English.

    - Moving on to the <head> section, we have various meta tags. The charset meta tag specifies the character encoding as UTF-8, ensuring proper handling of special characters. The http-equiv meta tag with the value "X-UA-Compatible" sets the compatibility mode for Internet Explorer. The viewport meta tag defines the initial scale and width for responsive design.

    - The <title> element sets the title of the page to 'TODOs 2023'. We also have a link to the Font Awesome library, which provides icons for our task list.

    - In the <body> section, we have a header container that holds the title 'TODOs' and a form for inputting and submitting tasks. The form has an input field with the id "new-task-input" and a submit button with the id "new-task-submit".

    - Next, we have the main container, which includes a section with the class "task-list". Inside this section, we have a status bar that displays the total number of tasks, as well as the number of completed and uncompleted tasks. The task list itself is represented by a <div> element with the id "tasks".

    - Below the task list, we have a section for managing tasks. There are two buttons: "Complete all tasks" and "Clear completed". These buttons allow users to mark all tasks as complete or delete the completed tasks.

    - Finally, at the end of the HTML document, we have a <script> tag that references the JavaScript file "script.js". This file is responsible for handling the dynamic behavior of the task list application.

# JavaScript File - 
    - The code begins with an event listener attached to the load event of the window object. This ensures that the code executes when the page finishes loading.

    - Inside the event listener, we define several variables to store references to various elements on the page. These elements include the task form, input field, task list container, task counters, and buttons for marking tasks as complete or clearing completed tasks.

    - The code also includes two important functions for managing data: 
        - UpdateLocalStorage and fetchTasksFromLocalStorage. 
        - The updateLocalStorage function saves the tasks array to the local storage as a JSON string. 
        - The fetchTasksFromLocalStorage function retrieves the tasks from the local storage and updates the tasks array accordingly.

    - Next, we have the renderTasks function responsible for rendering the tasks on the page. It starts by clearing the task list container and checks if there are any tasks to render. If tasks exist, it updates the task counter and iterates over each task in the tasks array. For each task, it creates the necessary HTML elements, such as checkboxes, input fields, and action buttons, and appends them to the task list container.

    - The code also includes event listeners for editing, deleting, and marking tasks as complete or incomplete. When the "Edit" button is clicked, the code toggles between edit and save mode, allowing the user to modify the task title. When the "Save" button is clicked, it updates the task title in the tasks array, updates the local storage, and re-renders the tasks.

    - Similarly, when the delete button is clicked, the code removes the task from the task list, updates the tasks array, updates the task counter, and updates the local storage.

    - The code also handles the task checkbox's click event to mark a task as complete or incomplete. It updates the task's completed property in the tasks array, updates the local storage, and updates the task status counters.

    - There are two additional event listeners for the task form's submit event and the buttons for marking all tasks as complete or clearing completed tasks. When a new task is submitted, the code creates a new task object, adds it to the tasks array, updates the local storage, and re-renders the tasks.

    - When the "Mark all tasks as complete" button is clicked, the code toggles the completion status of all tasks, updates the local storage, and re-renders the tasks.

    - Similarly, when the "Clear completed" button is clicked, the code removes all completed tasks from the tasks array, updates the task counter, updates the local storage, and re-renders the tasks.

    - To ensure data persistence, the code includes an initialization section that fetches tasks from the local storage, renders the tasks, and updates the task status counters.

    - Finally, the code checks if there are no tasks initially and hides the additional buttons for marking all tasks as complete and clearing completed tasks.