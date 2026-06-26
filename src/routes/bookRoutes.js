const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");
const { validate, bookSchema } = require("../middleware/validate");

router.get("/", authMiddleware, getBooks);
router.get("/:id", authMiddleware, getBookById);
router.post("/", authMiddleware, validate(bookSchema), createBook);
router.put("/:id", authMiddleware, validate(bookSchema), updateBook);
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;
