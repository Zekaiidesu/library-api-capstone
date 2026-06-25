const db = require("../config/db");

exports.borrowBook = (req, res) => {
  const { book_id } = req.body;

  db.query(
    `INSERT INTO borrowings
    (user_id, book_id, borrow_date)
    VALUES (?, ?, CURDATE())`,
    [req.user.id, book_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Book borrowed"
      });
    }
  );
};

exports.returnBook = (req, res) => {
  db.query(
    `UPDATE borrowings
     SET return_date = CURDATE()
     WHERE id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Book returned"
      });
    }
  );
};

exports.getBorrowings = (req, res) => {
  db.query(
    `
    SELECT
      borrowings.id,
      users.name,
      books.title,
      borrow_date,
      return_date
    FROM borrowings
    JOIN users
      ON borrowings.user_id = users.id
    JOIN books
      ON borrowings.book_id = books.id
    `,
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
};
