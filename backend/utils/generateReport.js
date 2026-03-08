const PDFDocument = require("pdfkit")
const crypto = require("crypto")

function generateReport(res, report){

  const doc = new PDFDocument({
    margin:50,
    size:"A4"
  })

  const reportId = "DRV-" + Date.now()

  const hash = crypto
    .createHash("sha256")
    .update(report.person.document + report.date)
    .digest("hex")

  res.setHeader("Content-Type","application/pdf")

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=drivercheck-report-${report.person.document}.pdf`
  )

  doc.pipe(res)

  /* HEADER */

  doc
    .fontSize(24)
    .fillColor("#000000")
    .text("DRIVERCHECK INTELLIGENCE PLATFORM")

  doc
    .fontSize(11)
    .fillColor("#555555")
    .text("Sistema de Verificación y Auditoría de Conductores")

  doc.moveDown()

  doc
    .fontSize(9)
    .fillColor("#000000")
    .text(`ID REPORTE: ${reportId}`)
    .text(`FECHA AUDITORÍA: ${new Date(report.date).toLocaleString()}`)

  doc.moveDown()

  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#cccccc")
    .stroke()

  doc.moveDown()

  /* TITULO */

  doc
    .fontSize(18)
    .fillColor("#000000")
    .text("INFORME DE VERIFICACIÓN DE CONDUCTOR",{
      align:"center"
    })

  doc.moveDown()

  /* DATOS PERSONA */

  doc
    .fontSize(13)
    .fillColor("#000000")
    .text("DATOS DEL CONSULTADO")

  doc.moveDown(0.5)

  doc
    .fontSize(11)
    .text(`Nombre: ${report.person.name}`)

  doc
    .text(`Documento: ${report.person.document}`)

  doc.moveDown()

  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#e5e5e5")
    .stroke()

  doc.moveDown()

  /* SCORE */

  doc
    .fontSize(13)
    .text("EVALUACIÓN DE RIESGO")

  doc.moveDown(0.5)

  doc
    .fontSize(11)
    .text(`Score de Riesgo: ${report.score} / 100`)

  let risk = "BAJO"

  if(report.score < 80) risk = "MEDIO"
  if(report.score < 50) risk = "ALTO"

  doc.text(`Nivel de Riesgo: ${risk}`)

  doc.moveDown()

  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#e5e5e5")
    .stroke()

  doc.moveDown()

  /* FUENTES CONSULTADAS */

  doc
    .fontSize(13)
    .fillColor("#000000")
    .text("FUENTES CONSULTADAS")

  doc.moveDown()

  report.sources.forEach(source => {

    doc
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .strokeColor("#cccccc")
      .stroke()

    doc.moveDown()

    doc
      .fontSize(16)
      .fillColor("#000000")
      .text(source.source)

    doc
      .fontSize(10)
      .fillColor("#666666")
      .text("Resultado de verificación")

    doc.moveDown(0.5)

    doc
      .fontSize(11)
      .fillColor("#000000")
      .text(source.result)

    doc.moveDown(1.5)

  })

  /* VALIDACIÓN */

  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .strokeColor("#cccccc")
    .stroke()

  doc.moveDown()

  doc
    .fontSize(12)
    .text("VALIDACIÓN DEL SISTEMA")

  doc.moveDown(0.5)

  doc
    .fontSize(10)
    .fillColor("#444444")
    .text(
      "Este informe fue generado automáticamente por la plataforma DriverCheck Intelligence Platform mediante consultas a fuentes públicas institucionales."
    )

  doc.moveDown()

  doc
    .text(
      "El presente documento puede utilizarse como soporte de verificación en procesos de auditoría, selección o evaluación de conductores."
    )

  doc.moveDown()

  doc
    .text(`HASH DE AUDITORÍA:`)

  doc
    .fontSize(8)
    .text(hash)

  doc.moveDown()

  /* FOOTER */

  doc
    .moveTo(50, 720)
    .lineTo(550, 720)
    .strokeColor("#cccccc")
    .stroke()

  doc.moveDown()

  doc
    .fontSize(8)
    .fillColor("#666666")
    .text("DriverCheck Intelligence Platform")
    .text(`ID Auditoría: ${reportId}`)
    .text(`Fecha generación: ${new Date().toLocaleString()}`)

  doc.moveDown()

  doc
    .text(
      "Advertencia: La información contenida en este documento proviene de fuentes públicas o registros administrativos. DriverCheck no altera ni modifica los datos obtenidos de dichas fuentes."
    )

  doc.end()

}

module.exports = generateReport
