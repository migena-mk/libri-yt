const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');

const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find().sort({ category: 1, title: 1 });
    res.status(200).json(books);
});

const getBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    res.status(200).json(book);
});

const createBook = asyncHandler(async (req, res) => {
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

    if (!title || !author || !category || !pages || !description) {
        res.status(400);
        throw new Error('Please fill in all book fields');
    }

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
        user: req.user.id,
    });
    res.status(200).json(book);
});

const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(400);
        throw new Error('Book not found');
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json(updatedBook);
});

const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(400);
        throw new Error('Book not found');
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: `Book ${req.params.id} deleted.` });
});

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };
