import { PrismaRepositoryCheckin } from '@/repositories/prisma/prisma-checkin-repository'
import { PrismaRepositorioGyn } from '@/repositories/prisma/prima-gyn-repository'
import { CheckinUser } from '../checkin'

export function makeCheckin() {
  const BANCODEDADOS_CHECKIN = new PrismaRepositoryCheckin()
  const BANCODEDADOS_GYN = new PrismaRepositorioGyn()

  const checkinUseCase = new CheckinUser(BANCODEDADOS_CHECKIN, BANCODEDADOS_GYN)
  return checkinUseCase
}
