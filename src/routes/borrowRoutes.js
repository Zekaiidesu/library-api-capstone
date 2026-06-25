const express = require("express");
const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  borrowBook,
  returnBook,
  getBorrowings
} = require("../controllers/borrowController");

router.post(
  "/",
  authMiddleware,
  borrowBook
);

router.put(
  "/return/:id",
  authMiddleware,
  returnBook
);

router.get(
  "/",
  authMiddleware,
  getBorrowings
);

module.exports = router;
