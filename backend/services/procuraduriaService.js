const axios = require("axios")

async function consultarProcuraduria(document){

  try{

    // simulación de scraping real
    const response = await axios.get(
      "https://www.procuraduria.gov.co/consulta"
    )

    return {
      source:"Procuraduría General",
      result:"Sin sanciones disciplinarias"
    }

  }catch(error){

    return {
      source:"Procuraduría General",
      result:"Consulta no disponible"
    }

  }

}

module.exports = consultarProcuraduria
