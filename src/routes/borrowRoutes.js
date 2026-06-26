const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { borrowBook, returnBook, getBorrowings } = require("../controllers/borrowController");
const { validate, borrowSchema } = require("../middleware/validate");

router.post("/", authMiddleware, validate(borrowSchema), borrowBook);
router.put("/return/:id", authMiddleware, returnBook);
router.get("/", authMiddleware, getBorrowings);

module.exports = router;
