import { FuncoesDoRepositorioCheckin } from '@/repositories/uso-repositorio-checkin'
import { Checkin } from '@prisma/client'

// [x] CRIAR AS INTERFACES DO GET LIST CHECKIN USERS
interface CheckinListUserRequest {
  id: string
  pagina: number
}
interface CheckinListUserResponse {
  CheckinList: Checkin[]
}
/*
CRIAÇAO DA FUNÇAO PRINCIPAL 
------------------------------------------------------------------------------------
*/
export class CheckinHistoryUser {
  constructor(private FuncoesRepositorio: FuncoesDoRepositorioCheckin) {}
  /*
  [x] listar todos os check-in imprindo todos os dados do repositorio checkin
usando o id para ajudar a identificar
*/
  async listar({
    id,
    pagina,
  }: CheckinListUserRequest): Promise<CheckinListUserResponse> {
    const checkins = await this.FuncoesRepositorio.listarCheckin(id, pagina)
    return {
      CheckinList: checkins,
    }
  }
}
