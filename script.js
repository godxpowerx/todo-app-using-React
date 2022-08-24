const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}



const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')


document.querySelector('#check-all-todo').addEventListener('click',complete_all)
document.getElementById('todo-form').addEventListener('submit', add_todo);


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('clear-all-todo').addEventListener('click', clear_all_todo)
  load_todo_list()
 
});

function complete_all() {
  

  if (localStorage.getItem('list_of_item')) {

    let items = localStorage.getItem('list_of_item')
    items = JSON.parse(items);

    comp_item = Object.keys(items);
    for (const item in items) {
      items[item] = 'completed';
    }

    localStorage.setItem('list_of_item', JSON.stringify(items))
    load_todo_list()
    return
  }

}

function load_todo_list() {
  
  list.innerHTML = '';



  if (localStorage.getItem('list_of_item')) {

    let items = localStorage.getItem('list_of_item')
    items = JSON.parse(items);

    let uncompleted = 0;
    let val_completed = Object.values(items);
    for (const comp in val_completed) {

      if (val_completed[comp] === 'uncompleted') {
        uncompleted++;
      }
    }

    uncheckedCountSpan.innerHTML = uncompleted;

    let count = 0;

    for (const item in items) {
      let item_contain = `
      <li class="todo-container flow-right controls"><span class="lead">${item}  </span>`
        
      if (items[item] === 'uncompleted'){
        item_contain += `<button data-id_num="${count}" data-todo="${item}" class="btn btn-primary center" id="complete-todo">
        Mark as Completed
        </button>`
      } else if (items[item] === 'completed') {
        item_contain += `<p class="bg-info m-2 p-1"> Completed </p>`;
      }

      item_contain += `
      <button data-id_num="${count}" data-todo="${item}" class="btn btn-primary center" id="delete-todo"> 
      Delete
      </button >
      </li>`;

      list.insertAdjacentHTML('afterbegin', item_contain)
      count++;

      if (items[item] === 'uncompleted') {
        document.getElementById('complete-todo').addEventListener('click', complete_todo);
      }
    }
    itemCountSpan.innerHTML = Object.keys(items).length;
   
    document.getElementById('delete-todo').addEventListener('click', delete_todo);
  } else {
    uncheckedCountSpan.innerHTML = 0;
    itemCountSpan.innerHTML = 0;
  }
}


function delete_todo() {
  const todo_item = this.dataset.todo;
  const id_num = this.dataset.id_num

  if (localStorage.getItem('list_of_item')) {

    let items = localStorage.getItem('list_of_item')
    items = JSON.parse(items);

    comp_item = Object.keys(items);
    if (comp_item[id_num] === todo_item) {
      delete items[todo_item]
    }

    localStorage.setItem('list_of_item', JSON.stringify(items))
    load_todo_list()
    return
  } 

}


function complete_todo() {
  const todo_item = this.dataset.todo;
  const id_num = this.dataset.id_num

  if (localStorage.getItem('list_of_item')) {
    
    let items = localStorage.getItem('list_of_item')
    items = JSON.parse(items);

    comp_item = Object.keys(items);
    if (comp_item[id_num] === todo_item) {
      items[todo_item] = 'completed';
    }

    localStorage.setItem('list_of_item', JSON.stringify(items))
    load_todo_list()
    return
  } 

}


function add_todo(event) {
  event.preventDefault()

  const todo_item = document.getElementById('new-todo-item').value.trim()

  if (todo_item.length === 0) {

    document.getElementById('new-todo-item').placeholder = 'cant add empty todo'
    document.getElementById('new-todo-item').style.borderColor = 'red'
    return;
  }

  if (localStorage.getItem('list_of_item')) {
    let items = localStorage.getItem('list_of_item')
    items = JSON.parse(items);

    items[todo_item] = 'uncompleted';

    localStorage.setItem('list_of_item', JSON.stringify(items))
  } else {
    const ob_dict = {};
    ob_dict[todo_item] =  'uncompleted'
    localStorage.setItem('list_of_item', JSON.stringify(ob_dict))
  }
  document.getElementById('new-todo-item').value = '';
  document.getElementById('new-todo-item').placeholder = 'add item to your todo list';
  document.getElementById('new-todo-item').style.borderColor = 'black';
  load_todo_list()
}

function newTodo() {
  alert('New TODO button clicked!')
}

function clear_all_todo() {
  localStorage.clear()
  load_todo_list()
}