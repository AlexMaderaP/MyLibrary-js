const express = require("express");
const { route } = require(".");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

// All Authors Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch (err) {
    res.redirect("/");
  }
});

// New Author Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors/${newAuthor.id}`);
  } catch (err) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({author: author._id}).limit(6).exec();
    res.render('authors/show', {author: author, booksByAuthor: books})
  } catch (error) {
    res.redirect('/')
  }
});

router.get("/:id/edit", async (req, res) => {
  const id = req.params.id;

  try {
    const author = await Author.findById(id).exec();
    res.render("authors/edit", { author: author });
  } catch (err) {
    console.log(err.message);
    res.redirect("/authors");
  }
});

router.put("/:id", async (req, res) => {
  const newName = req.body.name;
  let author;
  try {
    author = await Author.findById(req.params.id).exec();
    author.name = newName;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch (err) {
    if (author == null) {
      res.redirect("/");
    } else {
      res.render("authors/edit", {
        author: author,
        errorMessage: "Error updating Author",
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await Author.deleteOne({ _id: req.params.id });
    res.redirect(`/authors`);
  } catch (err) {
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

module.exports = router;
