const express = require("express");
const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

router.get("/", authMiddleware, getBooks);
router.get("/:id", authMiddleware, getBookById);

router.post("/", authMiddleware, createBook);

router.put("/:id", authMiddleware, updateBook);

router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;