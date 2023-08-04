// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleTaskAdded = (task) => {
    setTasks([...tasks, task]);
  };

  const handleTaskStatusChange = (taskId, status) => {
    setTasks(tasks.map((task) => (task._id === taskId ? { ...task, status } : task)));
  };
  

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div>
      <h1 className='mt-2 '>Task Management Application</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <TaskList
        tasks={tasks}
        onTaskStatusChange={handleTaskStatusChange}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
};

export default App;
