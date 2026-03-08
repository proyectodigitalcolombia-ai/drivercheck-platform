"use client"

import { useState } from "react"

export default function Dashboard() {

  const [document,setDocument] = useState("")
  const [result,setResult] = useState(null)
  const [loading,setLoading] = useState(false)

  const checkDriver = async () => {

    setLoading(true)

    const res = await fetch(`https://drivercheck-platform.onrender.com/api/drivers/check/${document}`)

    const data = await res.json()

    setResult(data)
    setLoading(false)
  }

  return (

    <div style={{display:"flex",fontFamily:"Arial"}}>

      {/* Sidebar */}

      <div style={{
        width:"220px",
        height:"100vh",
        background:"#111",
        color:"#fff",
        padding:"20px"
      }}>

        <h2>DriverCheck</h2>

        <p>Dashboard</p>
        <p>Consultas</p>
        <p>Empresas</p>
        <p>API</p>

      </div>

      {/* Main */}

      <div style={{flex:1,padding:"40px"}}>

        <h1>Verificación de Conductores</h1>

        <div style={{
          background:"#f4f4f4",
          padding:"20px",
          borderRadius:"10px",
          width:"400px"
        }}>

          <input
            style={{
              padding:"10px",
              width:"100%",
              marginBottom:"10px"
            }}
            placeholder="Documento del conductor"
            value={document}
            onChange={(e)=>setDocument(e.target.value)}
          />

          <button
            style={{
              padding:"10px",
              width:"100%",
              background:"#000",
              color:"#fff",
              border:"none",
              cursor:"pointer"
            }}
            onClick={checkDriver}
          >

            {loading ? "Consultando..." : "Verificar conductor"}

          </button>

        </div>

        {result && (

          <div style={{
            marginTop:"30px",
            background:"#fff",
            padding:"20px",
            border:"1px solid #ddd",
            borderRadius:"10px",
            width:"400px"
          }}>

            <h3>Resultado</h3>

            <p><b>Documento:</b> {result.document}</p>
            <p><b>Policía:</b> {result.police}</p>
            <p><b>Procuraduría:</b> {result.procuraduria}</p>
            <p><b>Score:</b> {result.score}</p>

          </div>

        )}

      </div>

    </div>

  )
}
