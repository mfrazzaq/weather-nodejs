const { encode } = require('iconv-lite');
const postmanRequest = require('postman-request');

const getWeather = (latitude, longitude, callback) => {
    postmanRequest('http://api.weatherstack.com/current?access_key=92b7a22bf015a3cc399733315a1ae798&query='+ latitude + ',' + longitude,
(error, response, body) => {
    var data;
    if(body){
        data = JSON.parse(body);
    }
    if(error){
        callback("No internet Connection", undefined)
    } else if(data.error){
        callback(data.error.info, undefined);
    }else{
        callback(undefined, data.current);
    }
});
}
module.exports = {
    getWeather
}