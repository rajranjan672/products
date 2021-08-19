const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmFqOTkzOTE0MzUiLCJhIjoiY2tzYnhsOXFsMGI3dzJucGZhYjcweHdxaiJ9._8-jjELj-xzYtvfSi66gLA'

    request({url, json : true}, (error, response) => {
        if(error) {
            callback('Undefined', undefined)
        }
        callback(undefined, {
            latitude: response.body.features[0].center[0],
            longitude :response.body.features[0].center[1],
            location: response.body.features[0].place_name
        })
    })
}


module.exports = geocode