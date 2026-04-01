import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

export async function getDBConnection() {

  const dbPath = path.join('database.db')

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  // Create tables automatically
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      artist TEXT,
      genre TEXT,
      price REAL,
      image TEXT
    );
  `)

  return db
}