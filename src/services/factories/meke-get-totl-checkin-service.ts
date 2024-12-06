import { PrismaRepositoryCheckin } from '@/repositories/prisma/prisma-checkin-repository'
import { CheckinListUser } from '../get-total-checkin'

export function makeTotalCheckin() {
  const BANCODEDADOS_GYN = new PrismaRepositoryCheckin()
  const buscarListGynUseCase = new CheckinListUser(BANCODEDADOS_GYN)
  return buscarListGynUseCase
}
