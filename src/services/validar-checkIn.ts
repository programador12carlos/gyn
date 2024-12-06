import { FuncoesDoRepositorioCheckin } from '@/repositories/uso-repositorio-checkin'
import { Checkin } from '@prisma/client'
import dayjs from 'dayjs'
import { ErroValidar } from './erros/errovalidar'

interface ValidateCheckInRequest {
  checkinId: string
}

interface ValidateCheckInResponse {
  checkin: Checkin | null
}

export class ValidateheckinUser {
  constructor(private funcosrepositorio: FuncoesDoRepositorioCheckin) {}

  async execute({
    checkinId,
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkin = await this.funcosrepositorio.buscarid(checkinId)

    if (!checkin) {
      throw new ErroValidar()
    }

    const distanciaEntreDatas = dayjs(new Date()).diff(
      checkin.create_time,
      'minutes',
    )

    if (distanciaEntreDatas > 20) {
      throw new ErroValidar()
    }

    checkin.validade_at = new Date() // Atualiza validade_at para o tempo atual
    await this.funcosrepositorio.salvar(checkin)
    return {
      checkin,
    }
  }
}
