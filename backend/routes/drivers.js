const express = require("express")

const router = express.Router()

// Base simulada de nombres
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

// generar nombre aleatorio
function generarNombre() {
  const index = Math.floor(Math.random() * fakeNames.length)
  return fakeNames[index]
}

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

// calcular score
function calcularScore(results) {

  let score = 100

  results.forEach(r => {

    const text = r.result.toLowerCase()

    if (text.includes("multa")) score -= 20
    if (text.includes("antecedente")) score -= 40
    if (text.includes("proceso")) score -= 30

  })

  if (score < 0) score = 0

  return score
}

router.get("/check/:document", async (req, res) => {

  const document = req.params.document

  try {

    const nombre = generarNombre()

    const results = await Promise.all([
      consultarPolicia(document),
      consultarProcuraduria(document),
      consultarRamaJudicial(document),
      consultarSimit(document)
    ])

    const score = calcularScore(results)

    const report = {

      person: {
        name: nombre,
        document: document
      },

      date: new Date(),

      sources: results,

      score: score

    }

    res.json(report)

  } catch (error) {

    res.status(500).json({
      error: "Error consultando fuentes"
    })

  }

})

module.exports = router
