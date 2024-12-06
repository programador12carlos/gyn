import { Prisma, Checkin } from '@prisma/client'

// interface com os metodos para aplicaçao no banco de dados
export interface FuncoesDoRepositorioCheckin {
  /*
Funçoes do banco 
----------------------------------------------------------------------------
[x] Procurar chekin do usuario no banco
[x] Criar check-in no banco
[x]  Listar checkin do usuario
   */

  // [x] procurar check-in do usuario no banco e retornar o ckeck-in ou null
  procurarDataCheckinUser(userId: string, data: Date): Promise<Checkin | null>

  // [x] efectuar o check-in em uma academia e retornar dados do check-in
  criar(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>

  // [x] listar checkin feito pelo usuario
  listarCheckin(userId: string, pagina: number): Promise<Checkin[]>

  // [x] DEVE SE POSSIVEL OBTER O NUMERO DE CHEK-IN REALIZADO PELO USUARIO LOGADO
  totalCheckin(id: string): Promise<number>

  // [x] deve ser possovel buscar id de checkin
  buscarid(id: string): Promise<Checkin | null>

  // [x] deve ser possivel salvar a alteracao feita no checkin no processo da validação
  salvar(checkin: Checkin): Promise<Checkin>
}
