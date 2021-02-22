const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const members = require('./Members')
const logger = require('./middleware/logger')

const app = express()



// Init middleware - runs every time a request is made
// app.use(logger)

// Handlebars middleware for templates
app.engine('handlebars', exphbs({defaultlayout: 'main'}))
app.set('view engine', 'handlebars')

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}))

// Set static folder - not showing because of the homepage route above
app.use(express.static(path.join(__dirname, 'public')))

// Members API routes
app.use('/api/members', require('./route/api/members'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))