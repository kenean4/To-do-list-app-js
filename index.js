const modal = document.getElementById("taskModal");
const form= document.getElementById("taskForm");
const confirmation= document.getElementById("confirmDelete")
let deleteId = null;

let tasks=[];
let nextId=1;
const taskCard = `<div class="task-item">
    <div class="task-checkbox" onclick="toggleTask()"></div>
    <div class="task-title"></div>
    <div class="status-badge status-smth"></div>
    <div class="priority-badge priority-smth">
        <i class=" fas fa-circle" style="font-size: 0.7em"></i>                         
    </div>
    <button class="edit" onclick="editTask()" >
        <span class="task-icon"><i class="fas fa-pen" ></i> </span>
    </button>
    <button class="delete" onclick="openConfirmation()">
        <span class="task-icon"><i class="fas fa-trash"></i> </span>
    </button>
</div>`;

function addTask(title, status, priority){
    const task={ id: nextId++, title, status, priority};
    tasks.push(task);
}

function render(){
    const list = document.getElementById("taskList");
    list.innerHTML= "";

    for(const task of tasks){
        list.innerHTML +=
    `<div class="task-item">
    <div class="task-title">${task.title}</div>
    <div class="status-badge status-${task.status}"><i class=" fas fa-circle" style="font-size: 0.7em"></i>${task.status}</div>
    <div class="priority-badge priority-${task.priority}"><i class=" fas fa-circle" style="font-size: 0.7em"></i>${task.priority}</div>
    <button class="delete" onclick="openConfirmation(${task.id})">
        <span class="task-icon"><i class="fas fa-trash"></i> </span>
    </button>
    </div>`
    }
}

function openModal(){
    modal.classList.add("active");
}

function closeModal(){
    modal.classList.remove("active");
}

form.addEventListener("submit", function (event){
    event.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const status = document.getElementById("taskStatus").value;
    const priority = document.getElementById("taskPriority").value;

    addTask(title,status,priority);
    render();
    closeModal();
    form.reset();
})

function deleteTask(){
    tasks= tasks.filter(function (task){
        return task.id!== deleteId;
    });
    render()
    closeConfirmation()
}
function openConfirmation(id){
    deleteId= id;
    confirmation.classList.add("confirm-active");
}
function closeConfirmation(){
    confirmation.classList.remove("confirm-active");
}



addTask("make a todo","progress","critical" );
addTask("go to church","pending","normal" );
render();
       