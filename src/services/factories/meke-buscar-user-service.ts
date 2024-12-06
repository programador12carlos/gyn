import { PrimsaRepositoryCreate } from '@/repositories/prisma/prisma-create-repositories'
import { GetId } from '../get-user-perfile'

export function makeGetUser() {
  const BANCODEDADOS_GYN = new PrimsaRepositoryCreate()
  const buscarGynUseCase = new GetId(BANCODEDADOS_GYN)
  return buscarGynUseCase
}
