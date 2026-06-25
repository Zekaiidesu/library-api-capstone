const db = require("../config/db");

exports.getBooks = (req, res) => {
  db.query(
    "SELECT * FROM books",
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
};

exports.getBookById = (req, res) => {
  db.query(
    "SELECT * FROM books WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
};

exports.createBook = (req, res) => {
  const { title, author, stock } = req.body;

  db.query(
    "INSERT INTO books (title,author,stock) VALUES (?,?,?)",
    [title, author, stock],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Book created"
      });
    }
  );
};

exports.updateBook = (req, res) => {
  const { title, author, stock } = req.body;

  db.query(
    "UPDATE books SET title=?, author=?, stock=? WHERE id=?",
    [title, author, stock, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Book updated"
      });
    }
  );
};

exports.deleteBook = (req, res) => {
  db.query(
    "DELETE FROM books WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Book deleted"
      });
    }
  );
};