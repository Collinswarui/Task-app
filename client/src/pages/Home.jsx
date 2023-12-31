import React from 'react';
import {useState, useEffect} from 'react';

const API_BASE = "https://task-backend-43vh.onrender.com";

export const Home = () => {
  
    // Add logic after setting up the application
  const [todos, setTodos] = useState([]);
  const [popupActive, setpopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");


  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
        .then(res => res.json())
        .then(data => setTodos(data))
        .catch(err => console.error("Error:", err));
  }

  const completeTodo = async id => {
    const data = await fetch(API_BASE + "/todo/complete/" + id)
    .then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }

      return todo;
    }));
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method:"DELETE"
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));

  }

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json());

    setTodos([...todos, data]);
    setpopupActive(false);
    setNewTodo("");
  }

  return (
    <div className='app'>
      <h1>Welcome To Wakori's task Application</h1>
      <h4>These are your tasks</h4>

      <div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} onClick={() => completeTodo(todo._id)}>
						<div className="checkbox"></div>

						<div className="text">{todo.text}</div>

						<div className="delete_todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>
      <div className='addPopup' onClick={() => setpopupActive(true)}>+</div>
      {popupActive ? (
          <div className='popup'>
            <div className='closePopup' onClick={() => setpopupActive
            (false)}>x</div>
            <div className='content'>
              <h3>Create A Task</h3>
              <input 
              type='text' 
              className='add-todo-input'
               onChange={e => setNewTodo(e.target.value)}
               value={newTodo} />
               <button className='button' onClick={addTodo}>Add Task</button>
               
            </div>
          </div>
      ) : ''}
        
    </div>
    

  )
  
};


