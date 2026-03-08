async function consultarProcuraduria(document){

  try{

    return "Sin sanciones disciplinarias"

  }catch(error){

    return "Consulta no disponible"

  }

}

module.exports = consultarProcuraduria
