const express = require("express")
const app = express()  
const bodyparser = require("body-parser")
const { check, validationResult } = require('express-validator');
const { matchedData, sanitizeBody } = require('express-validator');
app.set('view engine', 'twig')
app.set('views','./public/views')

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.get('/',(req,res)=>{
    res.render('index',{title: "User Login Form" })
})

app.post('/',check('username','username should be EmailId').isEmail(),
             check('password','password must be 5 character').isLength({min:5}),
             check('cnfpassword').custom((value,{req})=>{
                 if(value!=req.body.password){
                     throw new Error("Confirm Password Does't Matched!")
                 }else{
                     return true
                 }
             }),
             (req,res)=>{
                 const errors = validationResult(req)
                 const user = matchedData(req)
                 if(errors.isEmpty()){
                    res.render('loginsuccess',{title: "User Details", user:user})
                 }else{
                    res.render('index',{title: "User Details", error: errors.mapped(),user:user})
                 }
    
})

app.listen(3000,()=>{console.log("Server is running.......")})