const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2VlcmF0c2lkaHUwMSIsImEiOiJja2UzajFtcWgwZGhkMnlxZ3E2MW5oNnJiIn0.8Ds7pz6bs4E8X3r00-cHhA&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('This location does not exist. Try another location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    })
}

module.exports = geocode