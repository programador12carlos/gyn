import { Gin } from '@prisma/client'
import { FuncoesDoRepositorioGym } from '@/repositories/uso-repositories-gyn'

/*
 [x] criaçao das interfaces de entrada e saida da funcao
 [x] criação da class principal Buscar gym
 [x] configurar a classe
 -----------------------------------------------------------------------
*/
interface BuscarGymProximoRequest {
  latitude: number
  longitude: number
}

interface BuscarGymproximoResponse {
  gymList: Gin[]
}

export class BuscarGin {
  constructor(private FuncoesRepositorio: FuncoesDoRepositorioGym) {}

  async BuscarGymProximo({
    latitude,
    longitude,
  }: BuscarGymProximoRequest): Promise<BuscarGymproximoResponse> {
    const gymList = await this.FuncoesRepositorio.BuscarGymProximo({
      latitude,
      longitude,
    })
    return { gymList }
  }
}
