import { PrimsaRepositoryCreate } from '@/repositories/prisma/prisma-create-repositories'
import { RegistarUserCase } from '../register'

export function makeregisterservice() {
  const operacao_no_baco = new PrimsaRepositoryCreate()
  const registerUseCase = new RegistarUserCase(operacao_no_baco)
  return registerUseCase
}
