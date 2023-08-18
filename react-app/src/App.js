import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // Storing and Saving Todos Locally
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)            // setTodos(prevTodos => [...prevTodos, ...storedTodos])
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // Toggle the checkbox
  function toggleTodo(id) {
    const newTodos = [...todos] // creating a copy, never change the state directly.
    const todo = newTodos.find(todo => todo.id === id) // from newTodos, find a todo at the todo.id with that matches the id we passed in
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // Function for the Add todo Button
  function handleAddTodo(event) {
    const name = todoNameRef.current.value
    if (name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null  // clears the current value input
  }

  // Function to clear All the Complete-Checked Todos Button
  function handleClearTodos(event) {
    const filterCompleteTodos = todos.filter(todo => !todo.complete)
    setTodos(filterCompleteTodos)
  }

  return (
    <>
    <h1 className="title"> Tasks for today: </h1>

    <TodoList className="todoList" todos={todos} toggleTodo={toggleTodo}/>

    <input className="inputText" ref={todoNameRef} type="text" />

    <button class="btnAdd" onClick={handleAddTodo}> Add </button>
    <button class="btnClearAll" onClick={handleClearTodos}> Clear Complete </button>

    <div className="todosLeftToDo"> 
      Tasks still on the list: {todos.filter(todo => !todo.complete).length}
    </div>
    <div className="todosCompleted">
      Checked off tasks: {todos.filter(todo => todo.complete).length} 
    </div>

    </>
  );
}

export default App;
