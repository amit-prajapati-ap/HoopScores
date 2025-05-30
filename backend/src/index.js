import app from './app.js'
import 'dotenv/config'

const port = process.env.PORT || 6000

app.on("error", (error) => {
    console.log("Error in Index File: ", error)
})

app.listen(port, () => {
    console.log("http://localhost:5000")
})