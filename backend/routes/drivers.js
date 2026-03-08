const express = require("express")
const generateReport = require("../utils/generateReport")

const router = express.Router()

// base simulada
const fakeNames = [
  "Carlos Ramirez",
  "Luis Gonzalez",
  "Ana Torres",
  "Maria Lopez",
  "Andres Martinez",
  "Laura Rodriguez",
  "Daniel Herrera",
  "Sofia Castillo"
]

function generarNombre(){

  const index = Math.floor(Math.random() * fakeNames.length)
  return fakeNames[index]

}

async function consultarPolicia(document){

  return {
    source:"Policía Nacional",
    result:"Sin antecedentes"
  }

}

async function consultarProcuraduria(document){

  return {
    source:"Procuraduría General",
    result:"Sin sanciones disciplinarias"
  }

}

async function consultarRamaJudicial(document){

  return {
    source:"Rama Judicial",
    result:"Sin procesos activos"
  }

}

async function consultarSimit(document){

  return {
    source:"SIMIT",
    result:"Sin multas registradas"
  }

}

function calcularScore(results){

  let score = 100

  results.forEach(r=>{

    const text = r.result.toLowerCase()

    // solo restar puntos si hay problemas reales
    if(text.includes("multa pendiente")) score -= 20
    if(text.includes("antecedentes activos")) score -= 40
    if(text.includes("proceso activo")) score -= 30
    if(text.includes("sanción vigente")) score -= 25

  })

  if(score < 0) score = 0

  return score
}

// endpoint consulta normal
router.get("/check/:document", async (req,res)=>{

  const document = req.params.document

  try{

    const nombre = generarNombre()

    const results = await Promise.all([

      consultarPolicia(document),
      consultarProcuraduria(document),
      consultarRamaJudicial(document),
      consultarSimit(document)

    ])

    const score = calcularScore(results)

    const report = {

      person:{
        name:nombre,
        document:document
      },

      date:new Date(),

      sources:results,

      score:score

    }

    res.json(report)

  }catch(error){

    res.status(500).json({
      error:"Error consultando fuentes"
    })

  }

})

// endpoint generar PDF
router.get("/report/:document", async (req,res)=>{

  const document = req.params.document

  const report = {

    person:{
      name:"Consulta por documento",
      document:document
    },

    date:new Date(),

    sources:[
      {source:"Policía Nacional",result:"Sin antecedentes"},
      {source:"Procuraduría General",result:"Sin sanciones disciplinarias"},
      {source:"Rama Judicial",result:"Sin procesos activos"},
      {source:"SIMIT",result:"Sin multas registradas"}
    ],

    score:100

  }

  generateReport(res,report)

})

module.exports = router
