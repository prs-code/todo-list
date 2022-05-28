const input = document.querySelector("#box-duty");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".select-tag");

todoButton.addEventListener("click", addToList);//Function for create a list of tasks when clicked on button 
todoList.addEventListener("click", deletecompleteTodo);
filterOptions.addEventListener("click", filterItem);
document.addEventListener("DOMContentLoaded", getTodos);


function addToList (event) {
    event.preventDefault();//Avoid event default behavior
    const todoDiv = document.createElement("div");//create a div tag with className todo
    todoDiv.classList.add("todo");

    
    const todoLi = document.createElement("li");//create a list of tasks and equal this value with input text value
    todoLi.innerText = input.value;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);
    input.value = " ";
    
    saveLocalTodo(input.value);
    
    const compeletedButton = document.createElement("button");
    compeletedButton.innerHTML = "<i class = 'fas fa-check'></i>";
    compeletedButton.classList.add("complete-btn");
    todoDiv.appendChild(compeletedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class = 'fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}

function deletecompleteTodo () {
    console.log(event.target);
    const item = event.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodo(todo);
        todo.remove();
    } else if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveLocalTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodo (todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children [0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
}

function filterItem (event) {
    const todos = todoList.childNodes;
    todos.forEach (function(todo) {
        switch (event.target.value) {
            case "All":
                todo.style.display = "flex";
                break;

            case "completed":
                    if (todo.classList.contains("complete")) {
                        todo.style.display = "flex";
                    } 
                    else {
                        todo.style.display = "none";
                    }
                    break;

            case "Uncompleted":
                if (todo.classList.contains("Uncompleted")) {
                    todo.style.display = "flex";
                }
                 else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function getTodos () {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");//create a div tag with className todo
        todoDiv.classList.add("todo");
    
        const todoLi = document.createElement("li");//create a list of tasks and equal this value with input text value
        todoLi.innerText = todo;
        todoLi.classList.add("todo-item");
        todoDiv.appendChild(todoLi);
    
        const compeletedButton = document.createElement("button");
        compeletedButton.innerHTML = "<i class = 'fas fa-check'></i>";
        compeletedButton.classList.add("complete-btn");
        todoDiv.appendChild(compeletedButton);
    
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class = 'fas fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv);

    });
}
