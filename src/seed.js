require("dotenv").config();
const db = require("./config/db");
const bcrypt = require("bcrypt");

const seed = async () => {
  console.log("🌱 Starting database seeding...");
  
  try {
    console.log("🗑️  Clearing existing data...");
    await db.promise().query("SET FOREIGN_KEY_CHECKS = 0");
    await db.promise().query("TRUNCATE TABLE borrowings");
    await db.promise().query("TRUNCATE TABLE books");
    await db.promise().query("TRUNCATE TABLE users");
    await db.promise().query("SET FOREIGN_KEY_CHECKS = 1");
    
    console.log("👤 Seeding users...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = [
      ["John Doe", "john@email.com", hashedPassword],
      ["Jane Smith", "jane@email.com", hashedPassword],
      ["Admin User", "admin@email.com", hashedPassword],
      ["Budi Santoso", "budi@email.com", hashedPassword],
      ["Siti Rahayu", "siti@email.com", hashedPassword]
    ];
    
    for (const user of users) {
      await db.promise().query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", user);
    }
    console.log("✅ 5 users seeded");
    
    console.log("📚 Seeding books...");
    const books = [
      ["Atomic Habits", "James Clear", 5],
      ["Deep Work", "Cal Newport", 3],
      ["The Psychology of Money", "Morgan Housel", 4],
      ["The Pragmatic Programmer", "David Thomas", 2],
      ["Clean Code", "Robert C. Martin", 6],
      ["The Art of War", "Sun Tzu", 3],
      ["1984", "George Orwell", 4],
      ["To Kill a Mockingbird", "Harper Lee", 2],
      ["The Great Gatsby", "F. Scott Fitzgerald", 3],
      ["Pride and Prejudice", "Jane Austen", 5]
    ];
    
    for (const book of books) {
      await db.promise().query("INSERT INTO books (title, author, stock) VALUES (?, ?, ?)", book);
    }
    console.log("✅ 10 books seeded");
    
    console.log("📖 Seeding borrowings...");
    const borrowings = [
      [1, 1, "2026-06-20", null],
      [2, 2, "2026-06-21", "2026-06-25"],
      [3, 3, "2026-06-22", null],
      [1, 4, "2026-06-23", null],
      [4, 5, "2026-06-24", "2026-06-26"],
      [5, 6, "2026-06-25", null]
    ];
    
    for (const borrow of borrowings) {
      await db.promise().query(
        "INSERT INTO borrowings (user_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)",
        borrow
      );
    }
    console.log("✅ 6 borrowings seeded");
    
    console.log("🎉 Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seed();
