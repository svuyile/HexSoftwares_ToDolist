let worktodo =[];




window.onload = function() {
    const store = localStorage.getItem("worktodo");
    if (store) {
        worktodo = JSON.parse(store);
    }
    renderworktodoList(); // Always render from array
    document.getElementById("worktodo-addbutton").onclick = addWorktodo;
};
function saveWorktodo() {
    localStorage.setItem("worktodo", JSON.stringify(worktodo));
}


function addWorktodo() {
    let input = document.getElementById("worktodo-textinput");
    let task = input.value.trim();
    if (task) {
        worktodo.push({ text: task, completed: false }); // Store as object
        saveWorktodo();
        renderworktodoList(); // Always re-render
        input.value = "";
    }
}
function toggleworktodo(index){
    worktodo[index].completed = !worktodo[index].completed;
    saveWorktodo();
    renderworktodoList();
}
function deleteworktodo(index) {
    worktodo.splice(index, 1);
    saveWorktodo();
    renderworktodoList();
}
function renderworktodoList() {
    const worktodoListElement = document.getElementById("worktodo-list");
    worktodoListElement.innerHTML = "";

    worktodo.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="worktodo-textinput" onclick="toggleworktodo(${index})" 
                style="flex-grow: 1; cursor: pointer; white-space: nowrap;${task.completed ? ' text-decoration: line-through; color: #28a745;' : ''}">
                ${task.completed ? '<span style="color:#28a745;">✅</span> ' : ''}${task.text}
            </span>
            <button onclick="deleteworktodo(${index})" title="Delete task" style="background: none; border: none; cursor: pointer; font-size: 0.5em; color: #dc3545; padding: 0 6px;">
                ❌
            </button>
        `;
        worktodoListElement.appendChild(li);
    });
}

