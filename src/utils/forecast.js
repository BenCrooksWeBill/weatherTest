const request = require("request")

const forecast = (latitude,longitude,callback)=>{
    const url = "https://api.darksky.net/forecast/27b334d5f3905f006261b87900c11717/"+latitude+","+longitude+"?units=si"
    request({url , json:true},(error, {body})=>{
        if(error)
        {
            callback("Unable to connect to weather services!",undefined)
        }else if(body.error){
            callback("unable to find location",undefined)
        }else{
           const degrees = body.currently.temperature
           const rainChance = body.currently.precipProbability
           callback(undefined,body.daily.data[0].summary+" It is currently " + degrees + " out. There is a " + rainChance + "% chance of rain.")
        }
    })
}

module.exports = forecast