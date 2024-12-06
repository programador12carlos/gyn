import { FuncoesDoRepositorioCheckin } from '@/repositories/uso-repositorio-checkin'

// [x] CRIAR AS INTERFACES DO GET LIST CHECKIN USERS
interface TotalCheckInUserRequest {
  id: string
}
interface TotalCheckInUserResponse {
  totalCheckin: number
}
/*
CRIAÇAO DA FUNÇAO PRINCIPAL 
------------------------------------------------------------------------------------
*/
export class CheckinListUser {
  constructor(private FuncoesRepositorio: FuncoesDoRepositorioCheckin) {}
  /*
  [x] listar todos os check-in imprindo todos os dados do repositorio checkin
usando o id para ajudar a identificar
*/
  async listar({
    id,
  }: TotalCheckInUserRequest): Promise<TotalCheckInUserResponse> {
    const totalCheckin = await this.FuncoesRepositorio.totalCheckin(id)
    return {
      totalCheckin,
    }
  }
}
