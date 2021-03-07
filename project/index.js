const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')

const config = require('./config/database')
const users = require('./routes/users')

mongoose.connect(config)

mongoose.connection.on('connected', () => {
    console.log('Connected to database', config.database)
})

mongoose.connection.on('error', (err) => {
    console.log('Database error:', err)
})

const app = express()
const port = process.env.port || 3000

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use('./users', users)

app.get('/', (reqp,res) => {
    res.send('Invalid endpoint')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})