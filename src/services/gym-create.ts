import { Gin } from '@prisma/client'
import { FuncoesDoRepositorioGym } from '@/repositories/uso-repositories-gyn'

/*
 [x] criaçao das interfaces de entrada e saida da funcao
 -----------------------------------------------------------------------
*/
interface GymRequest {
  id: string
  title: string
  descricption?: string | null
  phone: string
  latitude: number
  longitude: number
}

interface GymResponse {
  gym: Gin
}
/*
-----------------------------------------------------------------------------
*/
export class Ginasio {
  constructor(private FuncoesRepositorio: FuncoesDoRepositorioGym) {}
  // [x] criar a funcao responsavel por criar o ginasio

  async Criar({
    id,
    title,
    descricption,
    phone,
    latitude,
    longitude,
  }: GymRequest): Promise<GymResponse> {
    const gym = await this.FuncoesRepositorio.CriarGym({
      id,
      title,
      descricption,
      phone,
      latitude,
      longitude,
    })
    return {
      gym,
    }
  }
}
