import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import * as shortid from 'shortid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    /* Create local unique ID */
    const id = shortid

    /* Todos State */
    const [todos, setTodos] = useState([])

    /* TODO list input reference */
    const todoInputRef = useRef()

    /* Load stored todos to setTodos in the application */
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    /* Store current page todos to local storage */
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    /* change todo state */
    function toggleTodo(id) {
        /* In react, never modify the original state.
        * Always make a copy */
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    /* Handler for add todo button */
    function handleOnTodo(e) {
        const name = todoInputRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, {id: id.generate(), name, completed: false}]
        })
        todoInputRef.current.value = null
    }

    function handleOnClearComplete(e) {
        const newTodos = todos.filter(todos => !todos.complete)
        setTodos(newTodos)
    }

    /* Return application */
    return (
      <>
          <TodoList todos = { todos } toggleTodo={toggleTodo}/>
          <input ref={ todoInputRef } type="text" />
          <button onClick={handleOnTodo}>Add To-Do</button>
          <button onClick={handleOnClearComplete}>Clear completed</button><br/>
          <span>{todos.filter(todo => !todo.complete).length} left to-do</span>
      </>
    );
}

export default App;
