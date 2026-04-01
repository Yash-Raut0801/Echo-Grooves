import express from 'express'
import { getGenres, getProducts } from '../controllers/productsControllers.js'

export const apiRouter = express.Router()

apiRouter.get('/genres', getGenres)
apiRouter.get('/', getProducts)