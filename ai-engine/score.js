exports.calculate = (police,procuraduria)=>{

  let score = 100

  if(police !== "sin antecedentes"){
    score -= 50
  }

  if(procuraduria !== "sin sanciones"){
    score -= 30
  }

  return score
}
