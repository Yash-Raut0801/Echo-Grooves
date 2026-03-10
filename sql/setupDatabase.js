import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { vinyl } from '../data.js'

async function setupDatabase() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL,
        year INTEGER,
        genre TEXT,
        stock INTEGER
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE(user_id, product_id)
      );
    `)

    // Keep the first row for each exact product and remove accidental duplicates.
    await db.run(`
      DELETE FROM products
      WHERE id NOT IN (
        SELECT MIN(id)
        FROM products
        GROUP BY title, artist, price, image, year, genre, stock
      )
    `)

    // Prevent duplicate products from being inserted in future seed runs.
    await db.exec(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_products_unique_seed
      ON products(title, artist, price, image, year, genre, stock)
    `)

    await db.exec('BEGIN TRANSACTION')

    for (const { title, artist, price, image, year, genre, stock } of vinyl) {
      await db.run(
        `INSERT OR IGNORE INTO products (title, artist, price, image, year, genre, stock)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, artist, price, image, year, genre, stock]
      )
    }

    await db.exec('COMMIT')
    console.log('Products table verified and seeded without duplicates.')

    console.log('Database setup complete.')
  } catch (err) {
    await db.exec('ROLLBACK').catch(() => {})
    console.error('Database setup failed:', err.message)
    process.exitCode = 1
  } finally {
    await db.close()
  }
}

setupDatabase()
