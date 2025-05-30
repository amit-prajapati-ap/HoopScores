import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))

app.get('/', (_,res) => {
    res.send("API Working")
})

//API End Pints
import gamesRoutes from './routes/games.route.js'
app.use('/api/v1', gamesRoutes)

export default app