const consultarPolicia = require("../services/policiaService")
const consultarProcuraduria = require("../services/procuraduriaService")

async function checkDriver(req,res){

  const document = req.params.document

  const policia = await consultarPolicia(document)
  const procuraduria = await consultarProcuraduria(document)

  const report = {

    person:{
      name:"Consulta por documento",
      document:document
    },

    score:100,

    sources:[
      {
        source:"Policía Nacional",
        result:policia
      },
      {
        source:"Procuraduría General",
        result:procuraduria
      }
    ],

    date:new Date()

  }

  res.json(report)

}

module.exports = { checkDriver }
