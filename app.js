const todoScroller = document.querySelector("div.todo-scroller");
const form = document.querySelector("form.todo-form");
function showTodos(doc) {
    let todoList = document.createElement("div");
    todoList.className = "todo-list";
    let addedTodo = document.createElement("div");
    addedTodo.className = "added-todo";
    todoList.setAttribute("data-id",doc.doc.id);
    addedTodo.setAttribute("data-id",doc.doc.id);
    addedTodo.textContent = doc.doc.data().what;
    todoList.appendChild(addedTodo);
    todoScroller.appendChild(todoList);

        // deleting of data
        todoList.addEventListener("click", e => {
            db.collection("todos").doc(doc.doc.id).delete();
        })
}

// reading of data

db.collection("todos").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == "added") {
            showTodos(change);
        } else if(change.type == "removed") {
            let todo = todoScroller.querySelector(`[data-id=${change.doc.id}]`);
            todoScroller.removeChild(todo);
        }
    })
})

// creating of data

form.addEventListener("submit", e => {
    e.preventDefault();
    db.collection("todos").add({
        what: form.what.value
    });
    form.what.value = "";
})
