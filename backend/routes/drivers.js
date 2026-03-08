const express = require("express")
const router = express.Router()

const scoreEngine = require("../../ai-engine/score")

router.get("/check/:document",(req,res)=>{

  const document = req.params.document

  const police = "sin antecedentes"
  const procuraduria = "sin sanciones"

  const score = scoreEngine.calculate(police,procuraduria)

  res.json({
    document,
    police,
    procuraduria,
    score
  })

})

module.exports = router
