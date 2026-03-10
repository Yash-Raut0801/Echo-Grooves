import { registerUser, loginUser, logoutUser, getCurrentUser } from '../controllers/authController.js'
import express from 'express'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logoutUser)
authRouter.get('/logout', logoutUser)
authRouter.get('/me', getCurrentUser)

