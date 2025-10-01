// query.js
const { MongoClient } = require("mongodb");

// ✅ Replace with your actual connection string
const uri = "mongodb+srv://marcasmatheka_db_user:Sescoresco@cluster0.5ex6lfc.mongodb.net/";

const dbName = "plp_bookstore";
const collectionName = "books";

async function queryBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    // Get database + collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch all books
    const books = await collection.find({}).toArray();

    if (books.length === 0) {
      console.log("⚠️ No books found. Did you run insert_book.js?");
    } else {
      console.log("📚 Books in database:");
      books.forEach((book, i) => {
        console.log(`${i + 1}. ${book.title} by ${book.author} (${book.year})`);
      });
    }
  } catch (err) {
    console.error("❌ Error occurred:", err);
  } finally {
    await client.close();
  }
}

// Run function
queryBooks();
