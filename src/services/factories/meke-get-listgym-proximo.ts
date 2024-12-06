import { PrismaRepositorioGyn } from '@/repositories/prisma/prima-gyn-repository'
import { BuscarGin } from '../getList-gyn-proximo'

export function makerAcademiaProxima() {
  const BANCODEDADOS_GYN = new PrismaRepositorioGyn()
  const buscarListGynUseCase = new BuscarGin(BANCODEDADOS_GYN)
  return buscarListGynUseCase
}
