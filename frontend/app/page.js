"use client"

import { useState } from "react"

export default function Page(){

  const [document,setDocument] = useState("")
  const [report,setReport] = useState(null)
  const [history,setHistory] = useState([])

  const consultar = async () => {

    if(!document) return

    const res = await fetch(`https://drivercheck-platform.onrender.com/api/drivers/check/${document}`)
    const data = await res.json()

    setReport(data)

    setHistory(prev => [
      {
        name:data.person.name,
        document:data.person.document,
        score:data.score,
        date:new Date().toLocaleString()
      },
      ...prev
    ])

  }

  const getRisk = (score)=>{

    if(score >= 80) return {label:"BAJO",color:"#16a34a"}
    if(score >= 50) return {label:"MEDIO",color:"#f59e0b"}
    return {label:"ALTO",color:"#dc2626"}

  }

  return(

    <div style={{
      display:"flex",
      minHeight:"100vh",
      fontFamily:"Arial",
      background:"#0f172a",
      color:"white"
    }}>

      {/* SIDEBAR */}

      <div style={{
        width:"250px",
        background:"#020617",
        padding:"30px"
      }}>

        <h2 style={{marginBottom:"40px"}}>
          DriverCheck
        </h2>

        <div style={{marginBottom:"20px"}}>
          Dashboard
        </div>

        <div style={{marginBottom:"20px"}}>
          Consultas
        </div>

        <div style={{marginBottom:"20px"}}>
          Reportes
        </div>

        <div style={{marginBottom:"20px"}}>
          Riesgo
        </div>

      </div>

      {/* MAIN */}

      <div style={{
        flex:1,
        padding:"40px"
      }}>

        <h1 style={{marginBottom:"30px"}}>
          Plataforma de Inteligencia de Conductores
        </h1>

        {/* CONSULTA */}

        <div style={{
          background:"#1e293b",
          padding:"25px",
          borderRadius:"10px",
          width:"400px",
          marginBottom:"40px"
        }}>

          <h3>Consultar Conductor</h3>

          <input
            value={document}
            onChange={(e)=>setDocument(e.target.value)}
            placeholder="Número de documento"
            style={{
              width:"100%",
              padding:"10px",
              marginTop:"10px",
              marginBottom:"10px",
              borderRadius:"6px",
              border:"none"
            }}
          />

          <button
            onClick={consultar}
            style={{
              width:"100%",
              padding:"10px",
              background:"#2563eb",
              border:"none",
              color:"white",
              borderRadius:"6px",
              cursor:"pointer"
            }}
          >
            Analizar Riesgo
          </button>

        </div>

        {/* REPORTE */}

        {report && (

          <div style={{
            background:"#1e293b",
            padding:"30px",
            borderRadius:"10px",
            marginBottom:"40px"
          }}>

            <h2>Reporte de Inteligencia</h2>

            <p><b>Nombre:</b> {report.person.name}</p>
            <p><b>Documento:</b> {report.person.document}</p>
            <p><b>Fecha:</b> {new Date(report.date).toLocaleString()}</p>

            <h2 style={{marginTop:"20px"}}>
              Score de Riesgo
            </h2>

            {(() => {

              const risk = getRisk(report.score)

              return(

                <div>

                  <div style={{
                    fontSize:"24px",
                    fontWeight:"bold",
                    color:risk.color
                  }}>
                    RIESGO {risk.label}
                  </div>

                  <div style={{
                    width:"100%",
                    height:"25px",
                    background:"#020617",
                    borderRadius:"10px",
                    marginTop:"10px"
                  }}>

                    <div style={{
                      width:`${report.score}%`,
                      height:"25px",
                      background:risk.color,
                      borderRadius:"10px"
                    }}></div>

                  </div>

                  <p style={{marginTop:"10px"}}>
                    {report.score} / 100
                  </p>

                </div>

              )

            })()}

            <h2 style={{marginTop:"30px"}}>
              Fuentes Consultadas
            </h2>

            {report.sources.map((s,i)=>(

              <div key={i} style={{
                background:"#020617",
                padding:"15px",
                borderRadius:"6px",
                marginTop:"10px"
              }}>
                <b>{s.source}</b>
                <p>{s.result}</p>
              </div>

            ))}

            <button
              onClick={() =>
                window.open(
                  `https://drivercheck-platform.onrender.com/api/drivers/report/${report.person.document}`,
                  "_blank"
                )
              }
              style={{
                marginTop:"30px",
                padding:"12px 25px",
                background:"#dc2626",
                border:"none",
                color:"white",
                borderRadius:"6px",
                cursor:"pointer"
              }}
            >
              Descargar Reporte PDF
            </button>

          </div>

        )}

        {/* HISTORIAL */}

        {history.length > 0 && (

          <div style={{
            background:"#1e293b",
            padding:"30px",
            borderRadius:"10px"
          }}>

            <h2>Historial de Consultas</h2>

            <table style={{
              width:"100%",
              marginTop:"20px",
              borderCollapse:"collapse"
            }}>

              <thead>

                <tr>

                  <th style={{textAlign:"left",padding:"10px"}}>
                    Nombre
                  </th>

                  <th style={{textAlign:"left",padding:"10px"}}>
                    Documento
                  </th>

                  <th style={{textAlign:"left",padding:"10px"}}>
                    Score
                  </th>

                  <th style={{textAlign:"left",padding:"10px"}}>
                    Fecha
                  </th>

                </tr>

              </thead>

              <tbody>

                {history.map((h,i)=>(

                  <tr key={i} style={{
                    borderTop:"1px solid #334155"
                  }}>

                    <td style={{padding:"10px"}}>
                      {h.name}
                    </td>

                    <td style={{padding:"10px"}}>
                      {h.document}
                    </td>

                    <td style={{padding:"10px"}}>
                      {h.score}
                    </td>

                    <td style={{padding:"10px"}}>
                      {h.date}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  )

}
