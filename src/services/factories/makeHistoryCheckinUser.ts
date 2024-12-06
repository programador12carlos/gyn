import { PrismaRepositoryCheckin } from '@/repositories/prisma/prisma-checkin-repository'
import { CheckinHistoryUser } from '@/services/getList-user-checkin'

export function MakeHistoryCheckin() {
  const BANCODEDADOS = new PrismaRepositoryCheckin()
  const HistoryCheckin = new CheckinHistoryUser(BANCODEDADOS)

  return HistoryCheckin
}
