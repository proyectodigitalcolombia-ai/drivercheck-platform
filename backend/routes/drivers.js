const express = require("express")
const router = express.Router()

const scoreEngine = require("../../ai-engine/score")

router.get("/check/:document",(req,res)=>{

  const document = req.params.document

  // Simulación de datos (luego se conectará a APIs reales)

  const person = {
    name: "Juan Carlos Pérez",
    document: document
  }

  const sources = [
    {
      source: "Policía Nacional",
      result: "Sin antecedentes"
    },
    {
      source: "Procuraduría General",
      result: "Sin sanciones"
    }
  ]

  const police = "sin antecedentes"
  const procuraduria = "sin sanciones"

  const score = scoreEngine.calculate(police,procuraduria)

  const report = {
    person,
    sources,
    score,
    date: new Date()
  }

  res.json(report)

})

module.exports = router
