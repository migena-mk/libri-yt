const express = require('express');
const router = express.Router();
const { getBooks, getBook, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', protect, createBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
