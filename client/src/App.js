import {useState, useEffect} from 'react';

const API_BASE = "https://localhost:3000";


function App() {
  const [todo, setTodos] = useState([]);
  const [popupActive, setpopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");


  useEffect(() => {
    GetTodos();
  }, [])

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
        .then(res => res.json())
        .then(data => setTodos(data))
        .catch(err => console.error("Error:", err));
  }

  return (
    <div className='app'>
      <h1>Welcome To My task Application</h1>
      <h4>These are your tasks</h4>

      <div className='todos'>
        {todo.map(todo => (
                <div className='todo'>
                  <div className='checkbox'></div>

                  <div className='text'>{todo.text}</div>

                  <div className='delete_todo'>X</div>
                </div>
        ))}

      </div>
    </div>

  )
}

export default App;
