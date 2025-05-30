import {Router} from 'express'
import { fetchGames } from '../controllers/games.controller.js'

const gamesRoutes = Router()

gamesRoutes.get('/games', fetchGames)

export default gamesRoutes