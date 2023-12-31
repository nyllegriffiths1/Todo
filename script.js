let container = document.querySelector('.container');
let parentList = document.createElement('ul');
container.appendChild(parentList);

function addingTask() {
   const addBtn = document.getElementById('add-btn');
   const inputElement = document.getElementById('todo-value');

   addBtn.addEventListener('click', () => {
      let inputValue = inputElement.value;

      if (inputValue.trim() !== '') {
         let listItem = document.createElement('li');
         listItem.textContent = inputValue;

         // Create a radio input for each task
         const radioInput = document.createElement('input');
         radioInput.type = 'radio';
         radioInput.name = 'taskRadio'; // Set a common name for radio inputs to allow selection of only one

         // Add event listener to handle radio selection and deletion of the task
         radioInput.addEventListener('change', () => {
            if (radioInput.checked) {
               // Remove the parent li when the radio input is checked
               storeTaskOnServer(inputValue);
               listItem.remove();
               console.log('Task completed and deleted:', inputValue);
            }
         });

         // Append the radio input to the li
         listItem.appendChild(radioInput);

         // Append the li to the ul
         parentList.appendChild(listItem);

         // clearing the input bar after adding a task

         inputElement.value = '';

      } else {
         console.log('Input is empty. Please enter a task.');
      }
   });

   inputElement.addEventListener('keypress', (event) => {
      let inputValue = inputElement.value;
  
      if (event.key === 'Enter' && inputValue.trim() !== '') {
          let listItem = document.createElement('li');
          listItem.textContent = inputValue;
  
          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'taskRadio';
  
          radioInput.addEventListener('change', () => {
              if (radioInput.checked) {
               // Send the task to the server
                  storeTaskOnServer(inputValue);
                  listItem.remove();
                  console.log('Task completed and deleted:', inputValue);
              }
          });
  
          listItem.appendChild(radioInput);
          parentList.appendChild(listItem);
  
          // Clear the input bar after adding a task
          inputElement.value = '';
      } else if (event.key === 'Enter') {
          console.log('Input is empty. Please enter a task.');
      }
  });
  
}

function storeTaskOnServer(task) {
   // Replace the url with your server endoint
   fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
   })

   .then((response) => response.json())
   .then((data) => console.log(data))
   .catch((error) => console.error('Error storing task:', error));
}

function fetchTasks(category) {
   fetch(`http://localhost:3000/tasks/${category}`)
   .then((response) => response.json())
   .then((data) => {
      // display tasks based on the selected category
      displayTasks(data);
   })
   .catch((error) => console.error('Error fetching tasks:', error));
}

function displayTasks(tasks) {
   const historyList = document.getElementById('history-list');
   // clear previous tasks
   historyList.innerHTML = '';

   tasks.forEach((task) => {
      let historyItem = document.createElement('li');
      historyItem.textContent = task;
      historyList.appendChild(historyItem);
   })
}

// The code above uses the FETCH API to send a POST request to your server when a task is completed/deleted


// Call the function to enable the functionality
addingTask();


