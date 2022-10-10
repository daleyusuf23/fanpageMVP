const express = require('express')
const app = express()
const PORT = 3000
// const cors = require('cors')

// app.use(cors());
app.use(express.static('public'));



app.listen(PORT, () => {
    console.log(`local server running on ${PORT}`)
});