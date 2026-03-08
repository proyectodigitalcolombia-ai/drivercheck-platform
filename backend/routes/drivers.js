const express = require("express")

const router = express.Router()

// simulaciones de consulta
async function consultarPolicia(document) {

  return {
    source: "Policía Nacional",
    result: "Sin antecedentes"
  }

}

async function consultarProcuraduria(document) {

  return {
    source: "Procuraduría General",
    result: "Sin sanciones disciplinarias"
  }

}

async function consultarRamaJudicial(document) {

  return {
    source: "Rama Judicial",
    result: "Sin procesos activos"
  }

}

async function consultarSimit(document) {

  return {
    source: "SIMIT",
    result: "Sin multas registradas"
  }

}

function calcularScore(results) {

  let score = 100

  results.forEach(r => {

    if (r.result.toLowerCase().includes("multa")) {
      score -= 20
    }

    if (r.result.toLowerCase().includes("antecedente")) {
      score -= 40
    }

    if (r.result.toLowerCase().includes("proceso")) {
      score -= 30
    }

  })

  return score

}

router.get("/check/:document", async (req,res)=>{

  const document = req.params.document

  try{

    const results = await Promise.all([

      consultarPolicia(document),
      consultarProcuraduria(document),
      consultarRamaJudicial(document),
      consultarSimit(document)

    ])

    const score = calcularScore(results)

    const report = {

      person:{
        name:"Consulta por documento",
        document:document
      },

      date:new Date(),

      sources:results,

      score

    }

    res.json(report)

  }catch(error){

    res.status(500).json({
      error:"Error consultando fuentes"
    })

  }

})

module.exports = router
