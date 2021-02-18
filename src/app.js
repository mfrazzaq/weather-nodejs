const path = require('path');
const express = require('express');
const hbs = require('hbs');
const mapBox = require('./utils/geocoding');
const weatherStack = require('./utils/weatherStack');
const port = process.env.PORT || 3000;


//Paths
const indexPath = path.join(__dirname, '../public');
const views = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

const app = express();
app.set('view engine', 'hbs');
app.set('views', views);
hbs.registerPartials(partialsPath);

app.use(express.static(indexPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Fazeel',
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Fazeel',
    });
});
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please send address",
        });
    }
    mapBox.getLatLng(req.query.address.toString(), (error, {latitude, longitude} = {}) => {
        if(error){
            return res.send({
                error: error,
            });
        }else if(latitude === undefined || longitude === undefined){
            return res.send({
                error: "No latitude longitude found",
            });
        }else{
            
            weatherStack.getWeather(latitude, longitude, (error, {temperature}) => {
                if(error){
                    return res.send({
                        error: error,
                    });     
                }else{
                    res.send({
                        forcast: temperature,
                        location: 'Location',        
                        address: req.query.address,
                    });
                    console.log('Response: '+  temperature);
                }
            });
            
        } 
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Here is the message paragraph',
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help Article are not found',
        name: 'Fazeel'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        message: 'Page Not Found',
        name: 'Fazeel'
    });
});

app.listen(port, () => {
    console.log("App is running on port " + port.toString());
});

