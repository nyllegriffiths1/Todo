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

// Call the function to enable the functionality
addingTask();


