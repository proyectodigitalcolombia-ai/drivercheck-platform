"use client"

import { useState } from "react"

export default function Home() {

  const [document, setDocument] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const checkDriver = async () => {

    if (!document) {
      alert("Ingrese un documento")
      return
    }

    try {

      setLoading(true)
      setError(null)

      const response = await fetch(
        `https://drivercheck-platform.onrender.com/api/drivers/check/${document}`
      )

      const data = await response.json()

      setResult(data)

    } catch (err) {

      setError("Error consultando la API")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div style={{
      padding: "40px",
      fontFamily: "Arial",
      background: "#f5f6fa",
      minHeight: "100vh"
    }}>

      <h1>DriverCheck Platform</h1>

      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        marginTop: "20px"
      }}>

        <h3>Consultar Conductor</h3>

        <input
          type="text"
          placeholder="Documento"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px"
          }}
        />

        <button
          onClick={checkDriver}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            background: "#2f80ed",
            color: "#fff",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Verificar
        </button>

      </div>

      {loading && (
        <p style={{ marginTop: "20px" }}>
          Consultando fuentes...
        </p>
      )}

      {error && (
        <p style={{ marginTop: "20px", color: "red" }}>
          {error}
        </p>
      )}

      {result && (

        <div style={{
          marginTop: "30px",
          background: "#fff",
          padding: "25px",
          borderRadius: "10px",
          width: "600px"
        }}>

          <h2>Reporte de Verificación</h2>

          <p><b>Nombre:</b> {result.person.name}</p>
          <p><b>Documento:</b> {result.person.document}</p>
          <p><b>Fecha:</b> {new Date(result.date).toLocaleString()}</p>

          <h3>Fuentes Consultadas</h3>

          {result.sources.map((s, i) => (
            <div key={i}>
              <p><b>{s.source}</b>: {s.result}</p>
            </div>
          ))}

          <h3>Score de Riesgo</h3>
          <p>{result.score}</p>

        </div>

      )}

    </div>

  )

}
