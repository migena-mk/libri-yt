const asyncHandler = require('express-async-handler');

// Importing the Book model to interact with the database
const Book = require('../models/taskModel');

const getTasks = asyncHandler(async (req, res) => {
    // Fetch the full public book catalog
    const books = await Book.find().sort({ category: 1, title: 1 });
    res.status(200).json(books);
});

const getTask = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    res.status(200).json(book);
});

const setTask = asyncHandler(async (req, res) => {
    const {
        title,
        author,
        category,
        pages,
        description,
        isbn,
        publisher,
        publishedYear,
        language,
        edition,
        shelfLocation,
        availability,
        copies,
        coverUrl,
        longDescription,
    } = req.body;

    // Check if the request body contains all fields required to create a book
    if (!title || !author || !category || !pages || !description) {
        res.status(400)
        throw new Error('Please fill in all book fields');
    }

    // Create a new book in the database and associate it with the admin who added it
    const book = await Book.create({
        title,
        author,
        category,
        pages,
        description,
        isbn,
        publisher,
        publishedYear,
        language,
        edition,
        shelfLocation,
        availability,
        copies,
        coverUrl,
        longDescription,
        user: req.user.id
    });
    res.status(200).json(book);
});

const updateTask = asyncHandler(async (req, res) => {
    // Check if the book exists
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(400);
        throw new Error('Book not found');
    }

    // Update the book with the new data from the request body
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json(updatedBook);
});

const deleteTask = asyncHandler(async (req, res) => {
    // Check if the book exists
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(400);
        throw new Error('Book not found');
    }

    // Delete the book from the database
    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: `Book ${req.params.id} deleted.` });
})

module.exports = { getTasks, getTask, setTask, updateTask, deleteTask }
