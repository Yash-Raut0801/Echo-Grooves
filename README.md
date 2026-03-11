# Echo Grooves

Online vinyl store built with Node.js, Express, SQLite, and vanilla JavaScript.

## Origin and Attribution
This project was built as part of the Scrimba "Learn Express.js" course.

- Original design and concept: Scrimba / Tom Chant
- Implementation: Yash Raut

Some sample assets and product data are educational and used for learning purposes.

## Features
- Product listing with search and genre filtering
- User registration and login
- Session-based authentication
- Cart APIs (add, count, list, remove, clear)
- SQLite database setup and seed

## Tech Stack
- Node.js
- Express
- express-session
- SQLite (`sqlite3` + `sqlite`)
- bcryptjs

## Project Structure
- `server.js` - App entry point
- `routes/` - API route modules
- `controllers/` - Request handlers
- `middleware/` - Auth middleware
- `db/` - Database connection helper
- `sql/setupDatabase.js` - Creates tables and seeds products
- `public/` - Static frontend files

## UI Theme (CSS Colors)
Defined in `public/css/index.css` under `:root`.

- `--color-bg`: `#040430`
- `--color-bg-light`: `#19153e`
- `--color-bg-lightest`: `#25253a`
- `--color-accent`: `#ff4c7b`
- `--color-text`: `#e0e0e0`
- `--color-input-bg`: `#35314f`
- `--color-placeholder`: `whitesmoke`

If you want to restyle the app, update only these CSS variables first.

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from example:
   PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```
   Bash:
   ```bash
   cp .env.example .env
   ```
3. Set your secret in `.env`:
   ```env
   SPIRAL_SESSION_SECRET=replace_with_a_long_random_secret
   ```
4. Initialize database:
   ```bash
   npm run setup-db
   ```
5. Start server:
   ```bash
   npm start
   ```

Server URL: `http://localhost:8000`

## Available Scripts
- `npm start` - Start backend server
- `npm run setup-db` - Create tables and seed products

## API Overview
- `GET /api/products` - List products
- `GET /api/products/genres` - List genres
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Current auth user
- `POST /api/cart/add` - Add item to cart (auth required)
- `GET /api/cart/cart-count` - Cart count (auth required)
- `GET /api/cart` - Cart items (auth required)
- `DELETE /api/cart/:itemId` - Remove one item (auth required)
- `DELETE /api/cart/all` - Clear cart (auth required)

## Safe Upload Checklist (GitHub)
Before pushing public code, verify:

1. `.env` is not committed.
2. `database.db` is not committed.
3. No hardcoded passwords/secrets/tokens in source files.
4. Session secret is strong and unique per environment.
5. If a secret was ever committed, rotate it immediately.

If `.env` or DB were tracked earlier, untrack them:

```bash
git rm --cached .env database.db
git commit -m "Remove local secrets and DB from tracking"
```
