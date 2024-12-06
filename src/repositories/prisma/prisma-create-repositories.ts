import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { FuncoesDoRepositorio } from '../uso-repositorio'

// Class para manipulação directa no banco de dados

export class PrimsaRepositoryCreate implements FuncoesDoRepositorio {
  /*
Funçoes do banco 
----------------------------------------------------------------------------
[x] Procurar user pelo id no banco
[x] Procurar user pelo email no banco
[x] Criar user no banco
   */

  // [x] Procurar user pelo id
  async procurarIdUsuario(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  // [x] Procurar o user pelo email
  async procurarGmailUsuario(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  // [x] Criar usuario
  async criar(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}
