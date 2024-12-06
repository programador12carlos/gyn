import { PrismaRepositoryCheckin } from '@/repositories/prisma/prisma-checkin-repository'
import { ValidateheckinUser } from '../validar-checkIn'

export function makeregisterservice() {
  const BANCODEDADOS_GYN = new PrismaRepositoryCheckin()
  const validarCheckinUseCase = new ValidateheckinUser(BANCODEDADOS_GYN)
  return validarCheckinUseCase
}
