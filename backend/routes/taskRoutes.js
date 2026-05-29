const express = require('express');
const router = express.Router();

// Importing the task controller
const { getTasks, setTask, updateTask, deleteTask } = require('../controllers/taskController');

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Public
router.get('/', getTasks)

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Public
router.post('/', setTask)

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Public
router.put('/:id', updateTask)

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Public
router.delete('/:id', deleteTask)

module.exports = router;
