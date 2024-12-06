import { FuncoesDoRepositorioGym } from '@/repositories/uso-repositories-gyn'
import { FuncoesDoRepositorioCheckin } from '@/repositories/uso-repositorio-checkin'
import { Checkin } from '@prisma/client'
import { ResouresError } from './erros/resoures-error-user'
import { getDistanceBetweenCoordinates } from './utlis/distancia_calc'

// [x] criaçao das interfaces de entrada e saida da funçao
interface CheckInRequest {
  userId: string
  ginId: string
  latitude: number
  longitude: number
}

interface CheckInResponse {
  checkin: Checkin
}
// class principal do checkin
export class CheckinUser {
  constructor(
    private funcosrepositorio: FuncoesDoRepositorioCheckin,
    private funcoesdorepositorioGyn: FuncoesDoRepositorioGym,
  ) {}

  async execute({
    userId,
    ginId,
    latitude,
    longitude,
  }: CheckInRequest): Promise<CheckInResponse> {
    /*
     condiçoes para a criacao do checkin
-------------------------------------------------------------------------------
  [x] verificar a existencia de um ginasio pelo id do mesmo
  [x] verificar pela data se o usuario ja fez o checkin hoje
  [x]verificar se o usuario esta distante da academia
    */
    // verificar a existencia de um ginasio pelo id do mesmo

    const gym = await this.funcoesdorepositorioGyn.ProcurarId(ginId)
    if (!gym) {
      throw new ResouresError()
    }
    // [x] verificar pela data se o usuario ja fez o check in hoje
    const procurarcheckinuser =
      await this.funcosrepositorio.procurarDataCheckinUser(userId, new Date())

    if (procurarcheckinuser) {
      throw new Error('O usuário já fez check-in hoje.')
    }
    // [x] verificar se o usuario esta distante da academia
    const dist = getDistanceBetweenCoordinates(
      {
        latitude,
        longitude,
      },
      {
        latitude: gym.latitule.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )
    if (dist > 0.1) {
      throw new Error()
    }
    // [x] criaçao de um checkin
    const checkin = await this.funcosrepositorio.criar({
      user_id: userId,
      gin_id: ginId,
    })
    return { checkin }
  }
}
