"use client"

import { useState } from "react"

export default function Page(){

  const [document,setDocument] = useState("")
  const [report,setReport] = useState(null)

  const consultar = async () => {

    const res = await fetch(`https://drivercheck-platform.onrender.com/api/drivers/check/${document}`)
    const data = await res.json()

    setReport(data)

  }

  const getRiskLevel = (score)=>{

    if(score >= 80) return {label:"BAJO RIESGO",color:"green"}
    if(score >= 50) return {label:"RIESGO MEDIO",color:"orange"}
    return {label:"ALTO RIESGO",color:"red"}

  }

  return(

    <div style={{
      fontFamily:"Arial",
      padding:"40px",
      background:"#f4f6f8",
      minHeight:"100vh"
    }}>

      <h1>DriverCheck Platform</h1>

      <div style={{
        background:"white",
        padding:"20px",
        width:"350px",
        borderRadius:"10px",
        boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
      }}>

        <h3>Consultar Conductor</h3>

        <input
          value={document}
          onChange={(e)=>setDocument(e.target.value)}
          placeholder="Documento"
          style={{
            width:"100%",
            padding:"10px",
            marginBottom:"10px"
          }}
        />

        <button
          onClick={consultar}
          style={{
            width:"100%",
            padding:"10px",
            background:"#2f6fed",
            color:"white",
            border:"none",
            borderRadius:"6px"
          }}
        >
          Verificar
        </button>

      </div>

      {report && (

        <div style={{
          background:"white",
          marginTop:"30px",
          padding:"30px",
          width:"600px",
          borderRadius:"10px",
          boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
        }}>

          <h2>Reporte de Verificación</h2>

          <p><b>Nombre:</b> {report.person.name}</p>
          <p><b>Documento:</b> {report.person.document}</p>
          <p><b>Fecha:</b> {new Date(report.date).toLocaleString()}</p>

          <h3>Score de Riesgo</h3>

          {(() => {

            const risk = getRiskLevel(report.score)

            return(

              <div>

                <div style={{
                  fontWeight:"bold",
                  color:risk.color,
                  marginBottom:"10px"
                }}>
                  {risk.label}
                </div>

                <div style={{
                  width:"100%",
                  height:"20px",
                  background:"#eee",
                  borderRadius:"10px"
                }}>

                  <div style={{
                    width:`${report.score}%`,
                    height:"20px",
                    background:risk.color,
                    borderRadius:"10px"
                  }}></div>

                </div>

                <p>{report.score}/100</p>

              </div>

            )

          })()}

          <h3>Fuentes Consultadas</h3>

          {report.sources.map((s,i)=>(

            <div key={i} style={{
              padding:"10px",
              border:"1px solid #eee",
              borderRadius:"6px",
              marginBottom:"10px"
            }}>
              <b>{s.source}</b>
              <p>{s.result}</p>
            </div>

          ))}

          <a
            href={`https://drivercheck-platform.onrender.com/api/drivers/report/${report.person.document}`}
            target="_blank"
          >
            <button style={{
              marginTop:"20px",
              padding:"10px 20px",
              background:"#111",
              color:"white",
              border:"none",
              borderRadius:"6px"
            }}>
              Descargar Reporte PDF
            </button>
          </a>

        </div>

      )}

    </div>

  )

}
