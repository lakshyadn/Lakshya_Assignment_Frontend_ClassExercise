// Get references
const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const list = document.getElementById('list');

// Add item
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (value === '') return;

  // Create list item
  const li = document.createElement('li');
  li.textContent = value;

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.style.marginLeft = '10px';

  // Delete item when clicked
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);

  form.reset();
});