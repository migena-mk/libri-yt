const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add a book title"],
        },
        author: {
            type: String,
            required: [true, "Please add the author"],
        },
        category: {
            type: String,
            required: [true, "Please add a category"],
        },
        pages: {
            type: Number,
            required: [true, "Please add the number of pages"],
            min: [1, "Pages must be greater than 0"],
        },
        description: {
            type: String,
            required: [true, "Please add a short description"],
        },
        isbn: {
            type: String,
            default: "",
        },
        publisher: {
            type: String,
            default: "",
        },
        publishedYear: {
            type: Number,
            min: [0, "Published year must be valid"],
        },
        language: {
            type: String,
            default: "",
        },
        edition: {
            type: String,
            default: "",
        },
        shelfLocation: {
            type: String,
            default: "",
        },
        availability: {
            type: String,
            enum: ['available', 'borrowed', 'reserved'],
            default: 'available',
        },
        copies: {
            type: Number,
            default: 1,
            min: [0, "Copies cannot be negative"],
        },
        coverUrl: {
            type: String,
            default: "",
        },
        longDescription: {
            type: String,
            default: "",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Book", bookSchema);
