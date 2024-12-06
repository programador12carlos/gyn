import { Gin, Prisma } from '@prisma/client'

export interface academiaProximas {
  longitude: number
  latitude: number
}
// interface com os metodos para aplicaçao no banco de dados
export interface FuncoesDoRepositorioGym {
  // [x] procurar o ginasio pelo id e retornar o ginasio ou null
  ProcurarId(id: string): Promise<Gin | null>
  // [x] criacao de ginasio
  CriarGym(data: Prisma.GinCreateInput): Promise<Gin>
  // [x] Buscar academia
  BuscarGym(query: string, pagina: number): Promise<Gin[]>
  // [] Buscar gyns proximos
  BuscarGymProximo(params: academiaProximas): Promise<Gin[]>
}
