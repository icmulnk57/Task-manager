
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

const AddTaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', formData);
      onTaskAdded(response.data);
      setFormData({ title: '', description: '', status: 'todo' });
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <form className="needs-validation" onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">
      Title:
    </label>
    <input
      type="text"
      className="form-control"
      id="title"
      name="title"
      value={formData.title}
      onChange={handleChange}
      required
    />
    <div className="invalid-feedback">Title is required.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">
      Description:
    </label>
    <textarea
      className="form-control"
      id="description"
      name="description"
      value={formData.description}
      onChange={handleChange}
      required
    />
    <div className="invalid-feedback">Description is required.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="status" className="form-label">
      Status:
    </label>
    <select
      className="form-select"
      id="status"
      name="status"
      value={formData.status}
      onChange={handleChange}
    >
      <option value="todo">To Do</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  </div>
  <button type="submit" className="btn btn-primary">
    Add Task
  </button>
</form>

  );
};

export default AddTaskForm;
