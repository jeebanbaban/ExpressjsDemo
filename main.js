const express = require("express")
const app = express()
// const middleware = require('./middleware.js')

app.set('view engine', 'ejs')
app.set('views','./public/views')
app.use(express.static('public'))
// app.use(middleware({ option1: '1', option2: '2' }))//external middleware(for all app objects)

//MiddleWare only for main.js
var studentValidator = (req,res,next)=>{
    if(req.params.id==undefined)
    console.log("Student id not found")
    else
    console.log("Student id = "+req.params.id)
    next()
}

//Using middleware(studentValidator)
app.get("/students/:id?",studentValidator,(req,res)=>{
    res.send("Student id is  : "+req.params.id)
})


app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.get("/users/:id?",(req,res)=>{
    if(req.params.id==undefined)
    res.send("Users data fetched ")
    else
    res.send("Users data fetched "+req.params.id)
})

app.get("/ab*cd",(req,res)=>{
    console.log(req.params)
    res.send("Pattern data fetched ")
})

app.get("/flights/:From?.:To?",(req,res)=>{
    if(req.params.From==undefined && req.params.To==undefined)
    res.send("flights data fetched")
    else    
    res.send("flights data fetched "+"From="+req.params.From +"To="+req.params.To)
})

app.post("/users/profile",(req,res)=>{
    res.send("Users data fetched")
})

app.listen(3000,()=>{console.log("Expressjs Server is runnig on 3000")})