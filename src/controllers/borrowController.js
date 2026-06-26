const db = require("../config/db");

exports.borrowBook = (req, res) => {
  const { book_id } = req.body;
  const user_id = req.user.id;

  db.query("SELECT stock FROM books WHERE id = ?", [book_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "Book not found" });
    if (result[0].stock <= 0) return res.status(400).json({ message: "Book is out of stock" });

    db.beginTransaction((err) => {
      if (err) return res.status(500).json(err);

      db.query(
        `INSERT INTO borrowings (user_id, book_id, borrow_date) VALUES (?, ?, CURDATE())`,
        [user_id, book_id],
        (err, result) => {
          if (err) {
            return db.rollback(() => res.status(500).json(err));
          }

          db.query("UPDATE books SET stock = stock - 1 WHERE id = ?", [book_id], (err, result) => {
            if (err) {
              return db.rollback(() => res.status(500).json(err));
            }

            db.commit((err) => {
              if (err) {
                return db.rollback(() => res.status(500).json(err));
              }
              res.status(201).json({ message: "Book borrowed successfully", borrowing_id: result.insertId });
            });
          });
        }
      );
    });
  });
};

exports.returnBook = (req, res) => {
  const borrowing_id = req.params.id;

  db.query("SELECT book_id FROM borrowings WHERE id = ? AND return_date IS NULL", [borrowing_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "Active borrowing not found" });

    const book_id = result[0].book_id;

    db.beginTransaction((err) => {
      if (err) return res.status(500).json(err);

      db.query(`UPDATE borrowings SET return_date = CURDATE() WHERE id = ?`, [borrowing_id], (err, result) => {
        if (err) {
          return db.rollback(() => res.status(500).json(err));
        }

        db.query("UPDATE books SET stock = stock + 1 WHERE id = ?", [book_id], (err, result) => {
          if (err) {
            return db.rollback(() => res.status(500).json(err));
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => res.status(500).json(err));
            }
            res.json({ message: "Book returned successfully" });
          });
        });
      });
    });
  });
};

exports.getBorrowings = (req, res) => {
  db.query(
    `
    SELECT 
      borrowings.id,
      users.name as user_name,
      books.title as book_title,
      borrow_date,
      return_date,
      CASE WHEN return_date IS NULL THEN 'Borrowed' ELSE 'Returned' END as status
    FROM borrowings
    JOIN users ON borrowings.user_id = users.id
    JOIN books ON borrowings.book_id = books.id
    ORDER BY borrow_date DESC
    `,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
