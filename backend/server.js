const express = require("express")
const cors = require("cors")

const driverRoutes = require("./routes/drivers")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/drivers", driverRoutes)

app.get("/", (req,res)=>{
  res.json({message:"DriverCheck Platform API"})
})

const PORT = process.env.PORT || 10000

app.listen(PORT, ()=>{
  console.log("Server running on port",PORT)
})
