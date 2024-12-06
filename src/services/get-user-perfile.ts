import { FuncoesDoRepositorio } from '@/repositories/uso-repositorio'
import { User } from '@prisma/client'
import { ResouresError } from './erros/resoures-error-user'

interface GetUserRequest {
  userId: string
}
interface GetUserResponse {
  user: User
}
// criaçao da funcao principal GetId
export class GetId {
  constructor(private funcosrepositorio: FuncoesDoRepositorio) {}
  /*
     condiçoes para procurar usuario
-------------------------------------------------------------------------------
  [x] procurar o usuario pelo id 
    */
  async execute({ userId }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.funcosrepositorio.procurarIdUsuario(userId)

    // [x] procurar o usuario pelo id

    if (!user) {
      throw new ResouresError()
    }
    return { user }
  }
}
