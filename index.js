const modal = document.getElementById("taskModal");
const form= document.getElementById("taskForm");
const confirmation= document.getElementById("confirmDelete");
let deleteId = null;
let editId = null;

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
        const done= task.status==="completed"
        list.innerHTML +=
    `<div class="task-item">
    <div class="task-checkbox ${done? "completed":""}" id="checkbox${task.id}" onclick="toggleTask(${task.id})"></div>
    <div class="task-title">${task.title}</div>
    <div class="status-badge status-${task.status}"><i class=" fas fa-circle" style="font-size: 0.7em"></i>${task.status}</div>
    <div class="priority-badge priority-${task.priority}"><i class=" fas fa-circle" style="font-size: 0.7em"></i>${task.priority}</div>
    <button class="edit" onclick="editTask(${task.id})" >
        <span class="task-icon"><i class="fas fa-pen" ></i> </span>
    </button>
    <button class="delete" onclick="openConfirmation(${task.id})">
        <span class="task-icon"><i class="fas fa-trash"></i> </span>
    </button>
    </div>`
    }
    updateStats()

}

function openModal(){
    modal.classList.add("active");
}

function closeModal(){
    modal.classList.remove("active");
    editId = null;
    form.reset();
}

form.addEventListener("submit", function (event){
    event.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const status = document.getElementById("taskStatus").value;
    const priority = document.getElementById("taskPriority").value;
    if (editId !== null){
        tasks=tasks.map(function (task){
            if (task.id===editId){
                return{...task, title, status, priority};
            }
            return task;
        });
        editId= null;
    }
    else{ addTask(title,status,priority);}

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

function toggleTask(id){
tasks=tasks.map(function (task){
    if (task.id==id){
        return{...task, status: task.status==="completed"? "pending":"completed"}};
    
    return task;
});
render()
}

function editTask(id){
    const task= tasks.find(function(task){
        return task.id===id;});

    document.getElementById("taskTitle").value= task.title
    document.getElementById("taskStatus").value= task.status;
    document.getElementById("taskPriority").value= task.priority;
                    
editId=id;
openModal()    
}

function updateStats(){
    const completedTasks= tasks.filter(function(task){
        return task.status==="completed"
    }).length;
    const total= tasks.length;
    const completionRate=  total===0? 0:Math.round((completedTasks/total)* 100);
    const pendingTasks=total - completedTasks;

    document.getElementById("completionRate").textContent= completionRate;
    document.getElementById("totalTasksCount").textContent= tasks.length;
    document.getElementById("completedTasksCount").textContent= completedTasks;
    document.getElementById("pendingTasksCount").textContent= pendingTasks;
    document.getElementById("completionRateFill").style.width = completionRate+"%";
    document.getElementById("totalTasksFill").style.width = completionRate+"%";
    document.getElementById("task-count").textContent= pendingTasks;

                    
}

addTask("make a todo","progress","critical" );
addTask("go to church","pending","normal" );
render();
       