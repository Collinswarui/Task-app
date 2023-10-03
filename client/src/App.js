import {useState, useEffect} from 'react';

const API_BASE = "http://localhost:3000";


function App() {

  // Add logic after setting up the application
  const [todo, setTodos] = useState([]);
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

  return (
    <div className='app'>
      <h1>Welcome To My task Application</h1>
      <h4>These are your tasks</h4>

      <div className='todos'>
        {todo.map(todo => (
                <div className={
                  "todo" + (todo.complete ? "is-complete" : "")
                } key={todo._id} onClick={() => completeTodo(todo._id)}>
                  <div className='checkbox'></div>

                  <div className='text'>{todo.text}</div>

                  <div className='delete_todo' onClick={() => deleteTodo
                  (todo._id)}>X</div>
                </div>
        ))}

      </div>
      <div className='addPopup' onClick={() => setpopupActive(true)}>+</div>
    </div>

  )
}

export default App;
