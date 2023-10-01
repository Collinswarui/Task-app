import React from 'react';
import './index.css';


function App() {
  return (
    <div className='app'>
      <h1>Welcome To My task Application</h1>
      <h4>These are your tasks</h4>

      <div className='todos'>
        <div className='todo'>
          <div className='checkbox'></div>
          <div className='text'>Get the bread</div>
          <div className='delete_todo'>x</div>
        </div>

        <div className='todo is-complete'>
          <div className='checkbox'></div>
          <div className='text'>Get the milk</div>
          <div className='delete_todo'>x</div>
        </div>
      </div>
    </div>

  )
}

export default App;
