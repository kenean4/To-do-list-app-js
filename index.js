const taskCard=
<div class="task-item">
                    <div class="task-checkbox" onclick="toggleTask()"></div>
                        <div class="task-title">Make a todo</div>

                        <div class="status-badge status-smth"></div>
                        <div class="priority-badge priority-smth">
                            <i class=" fas fa-circle" style="font-size: 0.7em"></i>
                            
                        </div>

                        <button class="edit" onclick="editTask()" >
                            <span class="task-icon"><i class="fas fa-pen" ></i> </span>
                        </button>
                        <button class="delete" onclick="deleteTask()">
                            <span class="task-icon"><i class="fas fa-trash"></i> </span>
                        </button>

                    
                </div>
                