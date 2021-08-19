const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url ='http://api.weatherstack.com/current?access_key=b47c8cb6d460d5d0ff5e4a1787c46532&query=' + longitude + ','+ latitude +'&units=m'

    request({ url , json:true}, (error, response) => {
        callback( undefined , response.body.current.weather_descriptions[0] +'. It is currently ' + response.body.current.temperature + ' degrees celcious out. It feels like ' + response.body.current.feelslike)
    })
}

 module.exports = forecast
 