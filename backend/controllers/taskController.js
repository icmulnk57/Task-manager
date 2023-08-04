
const Task = require('../models/taskModel');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create task', error: err.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch task', error: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    console.log('Updating task:', req.params.id, req.body);
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    console.log('Updated task:', updatedTask);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};


// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(deletedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
};
