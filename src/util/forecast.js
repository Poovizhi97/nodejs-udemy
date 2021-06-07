const request=require('request')




const forecast=(latitude,laggitude,callback)=>{

const url='http://api.weatherstack.com/current?access_key=9e98c6910969b76a527d8b5bcdb64126&query=' + latitude + ',' + laggitude + '&units=f'

request({url:url,json:true},(error,response)=>{
      if(error){
        callback("unable to connect services",undefined)
      }else if(response.body.error){
          callback("unable to find location try again",undefined)

      }else{
       callback(undefined,' The current temperature is ' + response.body.current.temperature +  ' and its feelslike '+ response.body.current.feelslike+'also its humidity '+ response.body.current.humidity)
      }
})

}

module.exports=forecast