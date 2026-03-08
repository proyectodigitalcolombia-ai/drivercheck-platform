const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
  res.json({
    message:"DriverCheck API running"
  })
})

app.get("/api/drivers/check/:document",(req,res)=>{

  const document = req.params.document

  const report = {

    person:{
      name:"Juan Carlos Perez",
      document:document
    },

    date:new Date(),

    sources:[
      {
        source:"Policía Nacional",
        result:"Sin antecedentes"
      },
      {
        source:"Procuraduría General",
        result:"Sin sanciones"
      }
    ],

    score:100

  }

  res.json(report)

})

const PORT = process.env.PORT || 10000

app.listen(PORT,()=>{
  console.log("Server running on port",PORT)
})
