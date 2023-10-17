const express = require("express");
const { route } = require(".");
const router = express.Router();
const Book = require("../models/book");
const Author = require("../models/author");
const author = require("../models/author");

// All Books Route
router.get("/", async (req, res) => {
  res.send('All Books');
});

// New Book Route
router.get("/new", async (req, res) => {
  try {
    const authors = await Author.find({})
    const book = new Book();
    res.render('books/new.ejs',{
      authors: authors,
      book: book,
    })  

  } catch (err) {
    res.redirect('/books');
  }
  
});

// Create Book Route
router.post("/", async (req, res) => {
  res.send('Create Book')
});

module.exports = router;
