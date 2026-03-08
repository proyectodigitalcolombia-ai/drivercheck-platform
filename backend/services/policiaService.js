const puppeteer = require("puppeteer")

async function consultarPolicia(document){

  try{

    const browser = await puppeteer.launch({
      headless:true,
      args:["--no-sandbox"]
    })

    const page = await browser.newPage()

    await page.goto(
      "https://antecedentes.policia.gov.co:7005/WebJudicial/",
      {waitUntil:"networkidle2"}
    )

    await page.type("#cedulaInput", document)

    await page.click("#btnConsultar")

    await page.waitForTimeout(3000)

    const result = await page.evaluate(()=>{

      const text = document.body.innerText

      if(text.includes("No registra antecedentes")){
        return "Sin antecedentes"
      }

      return "Registra antecedentes"

    })

    await browser.close()

    return {
      source:"Policía Nacional",
      result:result
    }

  }catch(error){

    return {
      source:"Policía Nacional",
      result:"Consulta no disponible"
    }

  }

}

module.exports = consultarPolicia
