// Defining UI Elements
let form = document.querySelector('#task_input_form');
let inputTask = document.querySelector('#task_input');
let filterTask = document.querySelector('#filter');
let taskList = document.querySelector('#task_list');
let clearTasks = document.querySelector('#clear_tasks'); 

// Events
form.addEventListener('submit',addTask);
taskList.addEventListener('click',removeTask);
clearTasks.addEventListener('click',clearAllTask);
filterTask.addEventListener('keyup',filter);
document.addEventListener('DOMContentLoaded',fromLocalStorage);


// Add New Task Function
function addTask(e){
    if (inputTask.value === '') {
        alert("Empty task can't be add");
    }else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(inputTask.value +" "));
        let liLink = document.createElement('a');
        liLink.setAttribute('href','#');
        liLink.appendChild(document.createTextNode('x'));
        li.appendChild(liLink);
        taskList.appendChild(li);
        storeToLocalStorage(inputTask.value);
        inputTask.value = '';
    }
    e.preventDefault();
}

// Function for Remove a task
function removeTask(e){
    if (e.target.hasAttribute('href')) {
        if (confirm('Do you want to remove the task?')) {
            let text = e.target.parentElement;
            text.remove();
            removeTaskFromLS(text); 
        }
    }
}

// Function for Clear all task
function clearAllTask(){
   // taskList.innerHTML = ''; an way to clear all tasks
   while (taskList.firstChild) {
       taskList.firstChild.remove();
   } // Another way to clear all tasks
   localStorage.clear();
}

// Function for filtering tasks
function filter(){
    let text = filterTask.value.toLowerCase();
    document.querySelectorAll('li').forEach(task=>{
        let taskItem = task.textContent.toLowerCase();
        if(taskItem.indexOf(text) != -1){
            task.style.display = 'list-item';
        }else{
            task.style.display = 'none';
        }
    })
}

// For Storing value in local storage
function storeToLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Function for getting tasks from local storage
function fromLocalStorage(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.forEach(task =>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task+" "));
        let liLink = document.createElement('a');
        liLink.setAttribute('href','#');
        liLink.appendChild(document.createTextNode('x'))
        li.appendChild(liLink);
        taskList.appendChild(li);
    })
}

// Remove a task
function removeTaskFromLS(e){
    e.lastChild.remove();
    let liText = e.textContent.trim();
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    tasks.forEach((task,index) =>{
        if(liText === task){
            tasks.splice(index,1)
        }
        
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
}