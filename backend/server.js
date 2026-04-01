import express from 'express';
import { apiRouter } from './routes/products.js';
import { authRouter } from './routes/auth.js';
import { meRouter } from './routes/me.js';
import { cartRouter } from './routes/cart.js';
import session from 'express-session';
import dotenv from 'dotenv'; 

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;
const SECRET_KEY = process.env.SPIRAL_SESSION_SECRET || "dev-secret"

app.use(express.json());
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
})) 

app.use(express.static('../frontend/public'));

app.use('/api/products', apiRouter);

app.use('/api/me', meRouter);

app.use('/api/auth', authRouter);

app.use('/api/cart', cartRouter);

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server: ',err )
})
