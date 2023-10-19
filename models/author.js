const mongoose = require("mongoose");
const Book = require("./book");

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

authorSchema.pre("deleteOne", async function (next) {
  try {
    const query = this.getFilter();
    const hasBook = await Book.exists({ author: query._id });

    if (hasBook) {
      next(new Error("This author has books still"));
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Author", authorSchema);
