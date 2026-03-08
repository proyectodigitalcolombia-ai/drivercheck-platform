const PDFDocument = require("pdfkit")
const crypto = require("crypto")
const QRCode = require("qrcode")

async function generateReport(res, report){

  const doc = new PDFDocument({
    margin:50,
    size:"A4"
  })

  const reportId = "DRV-" + Date.now()

  const hash = crypto
    .createHash("sha256")
    .update(report.person.document + report.date)
    .digest("hex")

  const verificationURL =
    `https://drivercheck-platform.onrender.com/verify/${reportId}`

  const qrImage = await QRCode.toDataURL(verificationURL)
  const qrBase64 = qrImage.replace(/^data:image\/png;base64,/, "")
  const qrBuffer = Buffer.from(qrBase64,"base64")

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

  doc.moveDown()

  let riskColor = "#16a34a"
  let risk = "BAJO"

  if(report.score < 80){
    risk = "MEDIO"
    riskColor = "#f59e0b"
  }

  if(report.score < 50){
    risk = "ALTO"
    riskColor = "#dc2626"
  }

  doc
    .fontSize(11)
    .text(`Score de Riesgo: ${report.score} / 100`)

  doc
    .text(`Nivel de Riesgo: ${risk}`)

  doc.moveDown()

  /* BARRA DE RIESGO */

  doc
    .rect(50, doc.y, 500, 15)
    .strokeColor("#cccccc")
    .stroke()

  doc
    .rect(50, doc.y, report.score * 5, 15)
    .fillColor(riskColor)
    .fill()

  doc.moveDown(2)

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
      .moveTo(70, doc.y)
      .lineTo(525, doc.y)
      .strokeColor("#9ca3af")
      .lineWidth(1.5)
      .stroke()

    doc.moveDown(0.3)

    doc
      .fontSize(14)
      .fillColor("#000000")
      .text(source.source,{
        align:"center"
      })

    doc.moveDown(0.3)

    doc
      .moveTo(70, doc.y)
      .lineTo(525, doc.y)
      .strokeColor("#9ca3af")
      .lineWidth(1.5)
      .stroke()

    doc.moveDown(0.8)

    doc
      .fontSize(10)
      .fillColor("#555555")
      .text("Resultado de verificación",{
        align:"center"
      })

    doc.moveDown(0.3)

    doc
      .fontSize(12)
      .fillColor("#000000")
      .text(source.result,{
        align:"center"
      })

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

  /* QR */

  doc
    .fontSize(10)
    .text("Verificación del reporte")

  doc.image(qrBuffer,50,doc.y,{
    width:90
  })

  doc.moveDown(5)

  doc
    .fontSize(8)
    .text(`URL: ${verificationURL}`)

  doc.moveDown()

  doc
    .text("HASH DE AUDITORÍA:")

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
