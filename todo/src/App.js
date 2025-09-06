import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [todo, setTodo] = useState([])
  const [newTodo, setNewTodo] = useState("");
  const [isDarkMode, setisDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setisDarkMode(!isDarkMode)

  }

  useEffect(() => {
    try {
      const savedTodos = JSON.parse(localStorage.getItem("todos"));
      if (Array.isArray(savedTodos)) {
        setTodo(savedTodos);
      }
    } catch (e) {
      console.error("Invalid todos in localStorage", e);
      setTodo([]); // reset to empty array if parsing fails
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);



  const handleAdd = () => {
    if (!newTodo.trim()) return; //prevents empty todos
    setTodo(td => [...td, { text: newTodo, completed: false }]);
    setNewTodo(""); // clear input after adding
  }

  const handleEdit = (index) => {
    const itemToEdit = todo[index];
    setNewTodo(itemToEdit.text);
    setTodo(todo.filter((_, i) => i !== index))
  }

  const toggleComplete = (index) => {
    setTodo(prev =>
      prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    )
  }

  const handleDelete = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className='wrap'>
        <h1 className='logo'>ToDo LIST</h1>
        <div className='add-tasks'>
          <input
            id='input'
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='Add your tasks...'
          />
          <button className='add' onClick={handleAdd}>SAVE</button>
          <button className='mode' onClick={toggleDarkMode}>{isDarkMode ? "☀️" : "🌙"}</button>
        </div>
      </div>

      <div className='tasks'>
        <h2>Goals to Achieve</h2>
        {todo.length === 0 && <div className='notodos'>No To Dos to display.</div>}
        {todo.map((items, index) => (
          <div className='list-wrapper' key={index}>
            <input type='checkbox'
              checked={items.completed}
              onChange={() => toggleComplete(index)} />
            <div className='list'>
              <span style={{ textDecoration: items.completed ? "line-through" : "none" }}>
                {items.text}</span>
              <div>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
