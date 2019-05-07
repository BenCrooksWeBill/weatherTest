const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")))

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        name: "ben"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title: "about me",
        name: "benjamin"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{    
        message: "does this help?",
        title: "help",
        name:"benjamin crooks"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"you must enter an address"
        })
    }
    else{
        geocode(req.query.address, (error, {latitude,longitude,location} = {}) =>{
            if(error)
            {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error)
                {
                    return res.send({error})
                }

                res.send({
                    forecast:forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must supply a search code"
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        name: "Benjamin Crooks",
        errorMessage: "help article not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"benjamin Crooks",
        errorMessage: "Page not found"
    })
})

app.listen(port,()=>{
    console.log("server is up on port "+port)
})