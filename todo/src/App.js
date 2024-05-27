import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todo');
      setTodos(response.data);
    } catch (error) {
      setError(`Error fetching todos: ${error.message}`);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const newTodo = { title, description };

    if (editId !== null) {
      try {
        const response = await axios.patch(`http://localhost:5000/api/todo/${editId}`, newTodo);
        setTodos(todos.map(todo => todo._id === editId ? response.data : todo));
        setEditId(null);
      } catch (error) {
        setError(`Error updating todo: ${error.message}`);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/todo', newTodo);
        setTodos([...todos, response.data]);
      } catch (error) {
        setError(`Error adding todo: ${error.message}`);
      }
    }

    setTitle('');
    setDescription('');
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find(todo => todo._id === id);
    setTitle(todoToEdit.title);
    setDescription(todoToEdit.description);
    setEditId(id);
  };

  const handleRemoveTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      setError(`Error removing todo: ${error.message}`);
    }
  };

  return (
    <div className='container'>
      <h2 className='heading'>Todo List</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAddTodo}>
        <label>Title:</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} /><br />
        <label>Description:</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} /><br />
        <button type='submit'>{editId !== null ? 'Update' : 'Add'}</button>
        <br />
      </form>
      <div id="todo-list">
        {todos.map(todo => (
          <div className='todo-item' key={todo._id}>
            <div className='task-details'>
              <p>Title: {todo.title}</p>
              <p>Description: {todo.description}</p>
              <p>Created Date: {new Date(todo.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <button onClick={() => handleEditTodo(todo._id)}>Edit</button>
              <button onClick={() => handleRemoveTodo(todo._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
