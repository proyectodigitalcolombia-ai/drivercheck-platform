const PDFDocument = require("pdfkit")

function generateReport(res, report){

  const doc = new PDFDocument()

  res.setHeader("Content-Type","application/pdf")
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=reporte_drivercheck.pdf"
  )

  doc.pipe(res)

  doc.fontSize(20).text("DriverCheck - Reporte de Verificación",{align:"center"})

  doc.moveDown()

  doc.fontSize(12).text("Nombre: " + report.person.name)
  doc.text("Documento: " + report.person.document)
  doc.text("Fecha: " + new Date(report.date).toLocaleString())

  doc.moveDown()

  doc.fontSize(14).text("Fuentes Consultadas")

  report.sources.forEach(source=>{
    doc.fontSize(12).text(source.source + ": " + source.result)
  })

  doc.moveDown()

  doc.fontSize(14).text("Score de Riesgo: " + report.score)

  doc.end()

}

module.exports = generateReport
