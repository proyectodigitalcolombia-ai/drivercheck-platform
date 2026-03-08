const PDFDocument = require("pdfkit")
const crypto = require("crypto")
const QRCode = require("qrcode")

async function generateReport(res,report){

  const doc = new PDFDocument({
    margin:50
  })

  const reportId = "DRV-" + Date.now()

  const hash = crypto
    .createHash("sha256")
    .update(report.person.document + report.date)
    .digest("hex")

  const verificationURL =
    `https://drivercheck-platform.onrender.com/verify/${reportId}`

  const qrImage = await QRCode.toDataURL(verificationURL)

  res.setHeader("Content-Type","application/pdf")

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=drivercheck-audit-${report.person.document}.pdf`
  )

  doc.pipe(res)

  /* HEADER */

  doc
    .fontSize(24)
    .text("DRIVERCHECK",{
      align:"left"
    })

  doc
    .fontSize(11)
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
    .text("INFORME DE VERIFICACIÓN DE CONDUCTOR",{
      align:"center"
    })

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

  /* TABLA FUENTES */

  doc
    .fontSize(12)
    .text("FUENTES CONSULTADAS",{underline:true})

  doc.moveDown()

  report.sources.forEach(source => {

    doc
      .fontSize(11)
      .text(`Fuente: ${source.source}`)

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
    .text("Puede utilizarse como soporte documental en procesos de auditoría, selección o evaluación de conductores.")

  doc.moveDown()

  /* QR */

  const qrBase64 = qrImage.replace(/^data:image\/png;base64,/, "")
  const qrBuffer = Buffer.from(qrBase64,"base64")

  doc
    .fontSize(10)
    .text("Código de Verificación:")

  doc.image(qrBuffer,50,500,{
    width:100
  })

  doc.moveDown()

  doc
    .fontSize(9)
    .text(`URL verificación: ${verificationURL}`)

  doc.moveDown()

  /* HASH */

  doc
    .fontSize(9)
    .text(`HASH DE AUDITORÍA:`)

  doc
    .fontSize(8)
    .text(hash)

  doc.moveDown()

  /* FOOTER */

  doc
    .moveTo(50,700)
    .lineTo(550,700)
    .stroke()

  doc.moveDown()

  doc
    .fontSize(8)
    .text("Advertencia Legal:")

  doc
    .text("La información contenida en este documento proviene de fuentes públicas o registros administrativos. DriverCheck no altera ni modifica los datos obtenidos de dichas fuentes.")

  doc.moveDown()

  doc
    .text(`Reporte generado automáticamente por DriverCheck Intelligence Platform.`)

  doc.end()

}

module.exports = generateReport
