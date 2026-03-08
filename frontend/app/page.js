{result && (

  <div style={{
    marginTop:"30px",
    background:"#ffffff",
    padding:"30px",
    border:"1px solid #ddd",
    borderRadius:"10px",
    width:"650px",
    textAlign:"left"
  }}>

    <h2 style={{marginBottom:"20px"}}>Reporte de Verificación de Conductor</h2>

    <p><b>Nombre del consultado:</b> {result.person.name}</p>
    <p><b>Documento de identidad:</b> {result.person.document}</p>
    <p><b>Fecha de consulta:</b> {new Date(result.date).toLocaleString()}</p>

    <hr style={{margin:"20px 0"}}/>

    <h3>Fuentes Oficiales Consultadas</h3>

    {result.sources.map((s,i)=>(
      <div key={i} style={{marginBottom:"10px"}}>
        <p><b>Fuente:</b> {s.source}</p>
        <p><b>Resultado:</b> {s.result}</p>
      </div>
    ))}

    <hr style={{margin:"20px 0"}}/>

    <h3>Score de Riesgo</h3>
    <p>{result.score}</p>

  </div>

)}
