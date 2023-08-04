
import React from 'react';
import axios from 'axios';
import '../App.css'

const TaskList = ({ tasks, onTaskStatusChange, onTaskDelete }) => {
  const handleStatusChange = async (taskId, status) => {
    try {
        console.log('Updating task status:', taskId, status);
        const response = await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, { status });
        
        console.log('Response:', response.data);
        onTaskStatusChange(taskId, status);
        
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      onTaskDelete(taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    
    <div className="container mt-5">
    <div className="row">
      {tasks.map((task) => (
        <div key={task._id} className="col-md-6 col-lg-4 mb-4">
          <div className={`card ${task.status === 'completed' ? 'bg-success' : 'bg-light'}`}>
            <div className="card-body">
              <h5 className={`card-title ${task.status === 'completed' ? 'text-white' : ''}`}>
                {task.title}
              </h5>
              <p className={`card-text ${task.status === 'completed' ? 'text-white' : ''}`}>
                {task.description}
              </p>
              <p className={`card-text ${task.status === 'completed' ? 'text-white' : 'text-muted'}`}>
                Status: {task.status}
              </p>
              <button
                className={`btn btn-sm ${task.status === 'completed' ? 'btn-light' : 'btn-success'}`}
                onClick={() => handleStatusChange(task._id, 'completed')}
                disabled={task.status === 'completed'}
              >
                Mark as Completed
              </button>
              <button
                className="btn btn-sm btn-danger ms-2"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default TaskList;
