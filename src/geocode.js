const request = require('request');

// callback abstraction 
const geocode = (address , callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=2&access_token=pk.eyJ1IjoiZ3VuamFuc2hyaW1hbGkiLCJhIjoiY2t0MnFrNWhxMGd1YzJucjF2ZzdkazJ6bCJ9.rEZG0EObPRv0yGMO8HJTvA'
  
  request({ url : url, json:true },(error,response)=>{
    if(error) {
      callback('unable to connect to location service!',undefined)
    } else if (response.body.features.length === 0){
      callback('unable to find location. Try another search.',undefined)
    } else {
      callback(undefined, {
          latitude: response.body.features[0].center[0],
          longitude: response.body.features[0].center[1],
          location: response.body.features[0].place_name
      })
    }
  })
}
geocode('india' , (error , data) => {
  console.log('Error', error) 
  console.log('Data', data)
})


module.exports = geocode