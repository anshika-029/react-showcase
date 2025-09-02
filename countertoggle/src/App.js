import { useState } from 'react';
import './App.css';

function App() {

  const [count, setCount] = useState(0);
  const [Darkmode, setDarkMode] = useState(false)

  return (
    <>
      <div className={`app ${Darkmode ? 'dark-mode' : 'light-mode'}`}>
        <div className='counter'>
          <button className='theme-toggle' onClick={() => setDarkMode(!Darkmode)}>
            {Darkmode ? '☀️' : '🌙'}
          </button>
          <div className="count">The count is {count}</div>
          <button className='increment' onClick={() => { setCount(count + 1) }}>+</button>
          <button className='decrement' onClick={() => { setCount(0) }}>Reset</button>
          <button className='reset' onClick={() => {
            if (count > 0) setCount(count - 1)
          }}>-</button>
        </div>
      </div>
    </>
  )
}

export default App;
