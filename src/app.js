const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location; Handlebars is a template engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manseerat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Manseerat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is help',
        title: 'Help Page',
        name: 'Manseerat'
    })
})
//first argument: route, second argument: function with request and response

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorMessage: 'Help article not found',
        title: '404 Error',
        name: 'Manseerat'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        errorMessage: 'Page not found',
        title: '404 Error',
        name: 'Manseerat'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})