const express= require('express');
const path= require('path');
const hbs= require('hbs');
const app= express();
const geocode= require('./utils/geocode');
const forecast= require('./utils/forecast');

//Paths for express config
const pubDirPath= path.join(__dirname,'../public');
const viewsPath= path.join(__dirname,'../templates/views');
const partialsPath= path.join(__dirname,'../templates/partials');

// Handlebars configuration
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(pubDirPath));

// app.get('/weather', (req, res) =>{
//     res.send({
//         forecast:'It is amazing',
//         location: 'Boston'
//     })
// })

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather',
        author: 'Sahil Sethi'
    });
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title:'Help',
        author: 'Sahil Sethi'
    })
})

app.get('/weather', (req, res) =>{
    console.log(req.query.address);
    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={} ) => {
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastdata) =>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
        })  
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        author: 'Sahil Sethi',
        errorMsg:'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title:'404',
        author: 'Sahil Sethi',
        errorMsg:'No page found'
    })
})

app.listen(3000, ()=>{
    console.log('Server running up at 3000');
})