const express = require("express")
const cors = require("cors")

const driversRoutes = require("./routes/drivers")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/drivers", driversRoutes)

app.get("/", (req,res)=>{
  res.json({
    message:"DriverCheck API funcionando"
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  console.log("Servidor iniciado en puerto " + PORT)
})
