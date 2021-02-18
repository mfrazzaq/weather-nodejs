const { encode } = require('iconv-lite');
const postmanRequest = require('postman-request');

const getLatLng = (address, callback) => {
    postmanRequest.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
    encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoiZnJyb3VnaCIsImEiOiJja2w5Yjg5dW4wcG04Mndtdm52M2IxaDA4In0.RcPYIMK8j6l0sw76EGE0lg&limit=1',
(error, response, body) => {
    var data;
    if(body){
        data = JSON.parse(body);
    }
    if(error){
        callback('No internet Connection', undefined);
    } else if(data.message){
        callback(data.message, undefined);
    }else if(data.features.length === 0 || data.features[0].center.length === 0){
      callback('No Latitude Longitude found for the given address', undefined);
    } else{
        callback(undefined, {
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
            address: data.features[0].place_type,
        });
    }
    
});
}

module.exports = {
    getLatLng,
};