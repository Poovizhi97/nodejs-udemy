const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicG9vdml6aHUiLCJhIjoiY2twY2Fja2k3MGlzdDJ1cnI0MHl0cnIwdSJ9.5PBV7mr1ojnlDEu0D_NZ4w&limit=1'
     request({url:url,json:true},(error,response)=>{
        if(error){
         callback("unable to connect a service",undefined)
        }else if(response.body.features.length === 0){
          callback("unable to find location, try again",undefined)
        }else{ 
           callback(undefined,{
        latitude:response.body.features[0].center[1],
            laggitude:response.body.features[0].center[0],
           location:response.body.features[0].place_name
        })
       }
        
 
     })
 }

module.exports=geocode