import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

const App = () => {
  const [item, setItem] = useState([]);
  const [newtask, setNewtask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/gettask').then(response => {
      setItem(response.data);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/addtask', { todo: newtask }).then(response => {
      setItem(response.data);
      setNewtask(''); // Clear input after adding task
    });
  };

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5001/delete/${id}`).then(response => {
      setItem(response.data);
    });
  };

  return (
    <div className="app">
      <center>
        <form onSubmit={submitHandler} className="form">
          <input
            type="text"
            value={newtask}
            onChange={(e) => setNewtask(e.target.value)}
            className="input"
            placeholder="Enter new task"
          />
          <input type="submit" value="Submit" className="submit-button" />
        </form>
        <div className="task-list">
          {item.map((task) => (
            <div key={task._id} className="task-item">
              <h3>{task.todo}</h3>
              <button onClick={() => deleteHandler(task._id)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
};

export default App;
