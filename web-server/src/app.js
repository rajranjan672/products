const path = require('path')
const express = require('express') 
const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')
const app = express()

const publicDir = path.join(__dirname, '../public')
// const viewspath = path.join(__dirname, '../')

// app.set('view engine', 'hbs')
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wather app',
        name: 'Andrew'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Must enter search.'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if(error) {
                return req.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     firecast: 'clear',
    //     location: 'New Delhi',
    //     address: req.query.address
    // })
})


app.listen(3000, () =>{
    console.log('server is up')
})