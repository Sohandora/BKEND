const express = require("express")

const app= express()


app.get('/',(req,res)=>{
    res.send("HEYYYYY")
})

app.get('/about',(req,res)=>{
    res.send("HEYYYYYmc")
})
app.get('/abou',(req,res)=>{
    res.send("HEYYYYYm")
})
app.listen(4000)