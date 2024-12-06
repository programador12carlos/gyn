import { PrimsaRepositoryCreate } from '@/repositories/prisma/prisma-create-repositories'
import { Auth } from '../auth'

export function makeregisterservice() {
  const BANCODEDADOS = new PrimsaRepositoryCreate()
  const auth = new Auth(BANCODEDADOS)
  return auth
}
