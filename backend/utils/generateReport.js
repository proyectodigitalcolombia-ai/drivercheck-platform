const PDFDocument = require("pdfkit")

function generateReport(res,report){

  const doc = new PDFDocument({
    margin:50
  })

  const reportId = "DRV-" + Date.now()

  res.setHeader("Content-Type","application/pdf")
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=drivercheck-report-${report.person.document}.pdf`
  )

  doc.pipe(res)

  /* HEADER */

  doc
    .fontSize(22)
    .text("DRIVERCHECK", {align:"left"})

  doc
    .fontSize(12)
    .text("Plataforma de Inteligencia y Verificación de Conductores")

  doc.moveDown()

  doc
    .fontSize(10)
    .text(`ID REPORTE: ${reportId}`)
    .text(`FECHA AUDITORÍA: ${new Date(report.date).toLocaleString()}`)

  doc.moveDown()

  doc
    .moveTo(50,150)
    .lineTo(550,150)
    .stroke()

  doc.moveDown()

  /* TITULO */

  doc
    .fontSize(18)
    .text("INFORME DE VERIFICACIÓN DE CONDUCTOR",{align:"center"})

  doc.moveDown()

  /* DATOS PERSONA */

  doc
    .fontSize(12)
    .text("DATOS DEL CONSULTADO",{underline:true})

  doc.moveDown()

  doc.text(`Nombre: ${report.person.name}`)
  doc.text(`Documento: ${report.person.document}`)

  doc.moveDown()

  /* SCORE */

  doc
    .fontSize(12)
    .text("EVALUACIÓN DE RIESGO",{underline:true})

  doc.moveDown()

  doc.text(`Score de Riesgo: ${report.score} / 100`)

  let risk = "BAJO"
  if(report.score < 80) risk = "MEDIO"
  if(report.score < 50) risk = "ALTO"

  doc.text(`Nivel de Riesgo: ${risk}`)

  doc.moveDown()

  /* FUENTES */

  doc
    .fontSize(12)
    .text("FUENTES CONSULTADAS",{underline:true})

  doc.moveDown()

  report.sources.forEach(source => {

    doc
      .fontSize(11)
      .text(`${source.source}`)

    doc
      .fontSize(10)
      .text(`Resultado: ${source.result}`)

    doc.moveDown()

  })

  doc.moveDown()

  /* VALIDACIÓN */

  doc
    .fontSize(12)
    .text("VALIDACIÓN DEL SISTEMA",{underline:true})

  doc.moveDown()

  doc
    .fontSize(10)
    .text("Este informe fue generado automáticamente por la plataforma DriverCheck mediante consultas a fuentes públicas y registros administrativos.")

  doc.moveDown()

  doc
    .text("El presente documento puede utilizarse como soporte de verificación de antecedentes en procesos de selección, contratación o evaluación de conductores.")

  doc.moveDown()

  /* FOOTER */

  doc
    .moveTo(50,650)
    .lineTo(550,650)
    .stroke()

  doc.moveDown()

  doc
    .fontSize(9)
    .text(`Reporte generado por DriverCheck Intelligence Platform`)
    .text(`ID auditoría: ${reportId}`)
    .text(`Fecha generación: ${new Date().toLocaleString()}`)

  doc.moveDown()

  doc
    .fontSize(8)
    .text("Advertencia: La información contenida en este documento proviene de fuentes públicas o registros administrativos. DriverCheck no altera ni modifica los datos obtenidos de dichas fuentes.")

  doc.end()

}

module.exports = generateReport
