const express = require('express');
const router = express.Router();

// Importing the task controller
const { getTasks, getTask, setTask, updateTask, deleteTask } = require('../controllers/taskController');

// Importing the protect middleware to secure routes that require authentication
const { protect, admin } = require('../middlewares/authMiddleware');

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get('/', getTasks);

// @route   GET /api/books/:id
// @desc    Get a single book
// @access  Public
router.get('/:id', getTask);

// @route   POST /api/books
// @desc    Create a new book
// @access  Private/Admin
router.post('/', protect, admin, setTask);

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Private/Admin
router.put('/:id', protect, admin, updateTask);

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteTask);

module.exports = router;
