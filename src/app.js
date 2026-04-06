const express = require("express")
const noteModel = require("./models/notes.model")
const app= express()
app.use(express.json())

const notes=[]
app.post("/notes", async (req, res) => {
    const { title, description} = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})
app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})
app.delete("/notes/:id", async (req,res)=>{
    const id=req.params.id
    
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted Succesfully"
    })
})
app.patch("/notes/:id",async (req,res)=>{
    const id=req.params.id

    const{description}=req.body
    const{title}=req.body

    await noteModel.findByIdAndUpdate(id,{description})
    await noteModel.findByIdAndUpdate(id,{title})


    res.status(200).json({
        message:"Note updated Succesfully"
    })

})

module.exports=app