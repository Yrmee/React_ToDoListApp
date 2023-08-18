import React from 'react'

export default function Todo({ todo, toggleTodo }) {

    // onChange function for making the checkboxes work
    function handleTodoClick() {
        // calling toggleTodo function and passing the prop id of the todo-item
        toggleTodo(todo.id)
    }

    return (
        <div className="todoItemContainer"> 
            <label className="todoItemLabel">
                <input className="completed" type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                <p className="todoItemName"> {todo.name} </p>
            </label>
        </div>
    )
}
