const request= require('request');

const forecast= (latitide,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=60df658558968a437edef0752c8d5a0a&query='+latitide+','+longitude;

    request({url} ,(error,{body:response})=>{
        if(error){
            callback('Unable to connect to the internet');
        }else if(response.error){
            callback("Unable to find location");
        }else{
            const data= JSON.parse(response);
            callback(undefined,'Weather is currently ' + data.current.weather_descriptions[0]+' with temperature '+ data.current.temperature + ' but feels like ' + data.current.feelslike + ' with humidity at '+ data.current.humidity + ' %');
    
        }
    })
    
}

module.exports= forecast;