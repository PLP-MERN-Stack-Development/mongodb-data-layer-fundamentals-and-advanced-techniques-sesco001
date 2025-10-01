// query.js
const { MongoClient } = require("mongodb");

// ✅ Replace with your actual connection string
const uri = "mongodb+srv://marcasmatheka_db_user:Sescoresco@cluster0.5ex6lfc.mongodb.net/";

const dbName = "plp_bookstore";
const collectionName = "books";

async function queryBooks() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 1. Find all books
    const allBooks = await collection.find({}).toArray();
    console.log("\n1️⃣ All Books:");
    allBooks.forEach((b) =>
      console.log(`${b.title} by ${b.author} (${b.year})`)
    );

     // 2. Find books by a specific author
    const authorBooks = await collection.find({ author: "George Orwell" }).toArray();
    console.log("\n2️⃣ Books by George Orwell:");
    console.log(authorBooks);

    // 3. Find books published after 1950
    const after1950 = await collection.find({ year: { $gt: 1950 } }).toArray();
    console.log("\n3️⃣ Books published after 1950:");
    console.log(after1950);

    /// 4. Find books in a specific genre
    const fictionBooks = await collection.find({ genre: "Fiction" }).toArray();
    console.log("\n4️⃣ Fiction Books:");
    console.log(fictionBooks);

    // 5. Find in-stock books
    const inStockBooks = await collection.find({ in_stock: true }).toArray();
    console.log("\n5️⃣ In-stock Books:");
    console.log(inStockBooks); 

  } catch (err) {
    console.error("❌ Error occurred:", err);
  } finally {
    await client.close();
  }
}

queryBooks();

