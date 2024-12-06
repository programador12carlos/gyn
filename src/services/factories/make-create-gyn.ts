import { PrismaRepositorioGyn } from '@/repositories/prisma/prima-gyn-repository'
import { Ginasio } from '../gym-create'

export function makecreateservice() {
  const BANCODEDADOS_GYN = new PrismaRepositorioGyn()

  const createGyninUseCase = new Ginasio(BANCODEDADOS_GYN)
  return createGyninUseCase
}
