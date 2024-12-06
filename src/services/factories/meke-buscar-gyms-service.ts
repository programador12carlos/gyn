import { PrismaRepositorioGyn } from '@/repositories/prisma/prima-gyn-repository'
import { BuscarGin } from '../buscar-gym'

export function makeBuscargyn() {
  const BANCODEDADOS_GYN = new PrismaRepositorioGyn()
  const buscarGynUseCase = new BuscarGin(BANCODEDADOS_GYN)
  return buscarGynUseCase
}
