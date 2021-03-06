const express= require('express')
//const bodyParser =require('body-parser');
const request= require('request')


const app=express()


const apiKey='28eaebb32d7a79fad8ebd6f3a24cd28c'

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

  app.set('view engine','ejs')

  app.get('/',function(req,res){
      res.render('index',{weather:null,error:null})
  })
  app.post('/',(req,res)=>{
      let city=req.body.city
      let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=28eaebb32d7a79fad8ebd6f3a24cd28c`
      
      
      request(url,function(err,response,body){
        
        console.log(body);
          if(err){
              res.render('index',{weather:null ,error:'Please try again'})
          }
          else{
              let weather=JSON.parse(body)
              
              if(weather.main==undefined){
                  res.render('index',{
                      weather:null,
                      error:'please try again'
                  })
              }else{
                 let weatherText=`It's ${weather.main.temp} degree celcius with ${weather.weather[0].main} in ${weather.name}`
                  res.render('index',{weather:weatherText,error:null})
                  console.log('body:',body);
              }
          }
      })
  })

  app.listen(3000,function(){
      console.log("wheatherly app listening on port 3000")
  })

