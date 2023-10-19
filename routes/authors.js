const express = require("express");
const { route } = require(".");
const router = express.Router();
const Author = require("../models/author");

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
    res.redirect("authors");
  } catch (err) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

router.get('/:id', (req,res) => {
  res.send('Show Author ' + req.params.id);
});

router.get('/:id/edit', async(req, res) => {
  const id = req.params.id;
  
  try {
    const author = await Author.findById(id).exec();
    res.render("authors/edit", { author: author });  
  } catch (err) {
    console.log(err.message);
    res.redirect("/authors")
  }

  
});

router.put('/:id', (req,res) => {
  res.send('Update Author ' + req.params.id);
});

router.delete('/:id', (req, res) => {
  res.send('Delete Author ' + req.params.id);
});

module.exports = router;
