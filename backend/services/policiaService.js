const axios = require("axios")

async function consultarPolicia(document){

  try{

    const response = await axios.get(
      `https://consulta-policia-api.com/${document}`
    )

    if(response.data.sinAntecedentes){
      return "Sin antecedentes"
    }

    return "Registra antecedentes"

  }catch(error){

    return "Consulta no disponible"

  }

}

module.exports = consultarPolicia
