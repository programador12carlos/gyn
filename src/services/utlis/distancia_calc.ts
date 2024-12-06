interface Coordinate {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  // Se as coordenadas são iguais, a distância é 0
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  // Conversão de coordenadas em radianos
  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180
  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  // Cálculo da distância
  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  // Corrigindo o valor de dist para cima de 1, pois Math.acos não aceita valores fora do intervalo [-1, 1]
  if (dist > 1) {
    dist = 1
  } else if (dist < -1) {
    dist = -1
  }

  // Cálculo do arco cosseno e conversão para milhas
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI // Convertendo de radianos para graus
  dist = dist * 60 * 1.1515 // Convertendo graus para milhas
  dist = dist * 1.609344 // Convertendo milhas para quilômetros

  console.log(
    `Distância entre (${from.latitude}, ${from.longitude}) e (${to.latitude}, ${to.longitude}): ${dist} km`,
  )

  return dist
}
