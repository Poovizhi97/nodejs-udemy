const path = require('path')

const express = require('express')
const hbs = require('hbs')
const { resolveSoa } = require('dns')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')


// console.log(__dirname)
// console.log(__filename)

// console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')// customizing the view directory
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('views' , viewsPath)//if u change the view dir name with any other name u can use this method
app.set('view engine' , 'hbs')//set allows you to set  value to given express
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index', {
        title:'Weather App',
        name:'Poovizhi'
    })
})//render is allows you to render views

app.get('/abouts', (req,res) =>{
    res.render('abouts', {
        title:"About Me",
        name:'pavithra'
    })
})

app.get('/helpmsg' ,(req,res) => {
    res.render('helpmsg', {
        paragraph:"Please help us to create a dynamic page",
        title:'Help',
        name:'Poovizhi'
    })
})



// app.get('', (req, res) => {
//      res.send('<h1> Weather</h1>')
// })

app.get('/help', (req,res) => {
     res.send([{
         name:'Poovizhi',
         age:23
     },{
         name:"pooja",
         age:34
     }])
})


// app.get('/about', (req,res) =>{
//     res.send('About page')
// }) 

app.get('/weather', (req,res) =>{
      
    if(!req.query.address){
     return   res.send({
             error:"you must be provide a address term"
        })
    }
    // res.send({
    //     forecast:342,
    //     location:"Dindigul",
    //     address: req.query.address
    // })
    else{
        geocode(req.query.address,(error,{ latitude, laggitude,location} = {} ) =>{
            if(error){
                return res.send({ error })
            }
            forecast(latitude,laggitude , (error,forecastData) =>{
                if(error){
                   return res.send({ error })
                }
              res.send({
                  forecast:forecastData,
                  location,
                  address:req.query.address
              })

            })
        })
    }
})

app.get('/product' , (req,res) =>{
  
    // console.log(req.query.rating)
    if(!req.query.search){
       return   res.send({
              error:"You must be provide a search term"
          })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})
app.get('/helpmsg/*', (req,res) =>{
       res.render('404', {
           title:"404",
           name:"Poovizhi",
           errorMessage:"Help article not found"
       })
})

app.get('*', (req,res) => {
           res.render('404', {
               title:'404',
               name:'Poovizhi',
               errorMessage:"Page not Found"
           })
})

//app.com --->root route
//app.com/help
//app.com/about

app.listen(3000, () =>{
   console.log('server is up on port 3000.')
})  //---> start up the server