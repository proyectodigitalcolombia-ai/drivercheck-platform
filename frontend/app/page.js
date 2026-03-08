"use client";

import { useState } from "react";

export default function Home() {

  const [document,setDocument] = useState("")
  const [result,setResult] = useState(null)

  const checkDriver = async () => {

    const res = await fetch(`https://drivercheck-api.muit.onrender.com/api/drivers/check/${document}`)

    const data = await res.json()

    setResult(data)
  }

  return (

    <div style={{padding:"40px",fontFamily:"Arial"}}>

      <h1>DriverCheck Platform</h1>

      <input
        placeholder="Driver document"
        value={document}
        onChange={(e)=>setDocument(e.target.value)}
      />

      <button onClick={checkDriver}>
        Check Driver
      </button>

      {result && (

        <div style={{marginTop:"20px"}}>

          <h3>Result</h3>

          <pre>
            {JSON.stringify(result,null,2)}
          </pre>

        </div>

      )}

    </div>

  )
}
