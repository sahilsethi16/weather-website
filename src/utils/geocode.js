const request= require('request');

const geocode = (address,callback) => {
    
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2FoaWxzZXRoaTE2IiwiYSI6ImNrOWQ1bTd1bzAwODAzaG11NTczZ3V0eG4ifQ.2BllW50qGKBYdSQsEyU2mg';    
    request({url, json: true}, (error, {body: response})=>{
        console.log('resp',response);
        if(error){
            callback('Unable to connect to location services');
        }else if(response.features.length== 0 || !response.features){
            callback('Unable to find location');
        }else{
            console.log('response',response);
            callback(undefined,{
                
                latitude: response.features[0].center[1],
                longitude: response.features[0].center[0],
                location: response.features[0].place_name
            })
        }
    })
}

module.exports = geocode;